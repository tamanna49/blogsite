function publishDate() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const todayDate = date.getDate() + " " + month + "," + date.getFullYear();
  return todayDate;
}

export default publishDate;
