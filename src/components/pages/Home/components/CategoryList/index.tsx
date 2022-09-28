import { Img, ListItem, WrapperList } from "./categoryList.style";
import Windows from "../../../../../assets/images/windows.svg";
import Playstation from "../../../../../assets/images/playstation.svg";
import Xbox from "../../../../../assets/images/xbox.svg";

const categoriesListData = [
  {
    name: "PC",
    source: Windows,
  },
  {
    name: "Playstation 5",
    source: Playstation,
  },
  {
    name: "XBox One",
    source: Xbox,
  },
];

const CategoriesList = () => (
  <WrapperList>
    {categoriesListData.map((el) => (
      <ListItem key={el.name} onClick={() => console.log(1)}>
        <Img src={el.source} />
        <h1>{el.name}</h1>
      </ListItem>
    ))}
  </WrapperList>
);

export default CategoriesList;
