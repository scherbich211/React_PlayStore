const formate = (date: string) => {
  const dates = date.substring(0, 10).split("-");
  return `${dates[1]}/${dates[2]}/${dates[0]}`;
};
export default formate;
