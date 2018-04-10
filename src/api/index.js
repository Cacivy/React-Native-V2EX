export default url => {
  return new Promise((reslove, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => reslove(data))
      .catch(e => reject(e));
  });
}
