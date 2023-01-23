export function numberWithCommas(x: number) {
  //console.log(x)
  if (!x) {
    return;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
