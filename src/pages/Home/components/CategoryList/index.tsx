import { Img, ListItem, WrapperList } from "./categoryList.style";
import Windows from "../../../../assets/images/windows.svg";
import Playstation from "../../../../assets/images/playstation.svg";
import Xbox from "../../../../assets/images/xbox.svg";

const categoriesListData = [
  {
    name: "PC",
    source: Windows,
    path: "/products/pc",
  },
  {
    name: "Playstation 5",
    source: Playstation,
    path: "/products/playstation",
  },
  {
    name: "XBox One",
    source: Xbox,
    path: "/products/xbox",
  },
];

const CategoriesList = () => (
  <WrapperList>
    {categoriesListData.map((el) => (
      <ListItem key={el.name} to={el.path}>
        <Img src={el.source} />
        <h1>{el.name}</h1>
      </ListItem>
    ))}
  </WrapperList>
);

export default CategoriesList;
