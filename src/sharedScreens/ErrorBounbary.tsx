import Alert from "@/components/Alert/alert";
import redirect from "@/utils/mics";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: null | Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      error,
    });
  }

  showText = () => {
    if (this.state.error && this.state.error.toString() !== "Error" && this.state.error !== null) {
      return this.state.error.toString();
    }
    return "Something went wrong";
  };

  render() {
    if (this.state.hasError) {
      return <Alert type="error" message={this.showText()} handle={() => redirect("/home")} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
