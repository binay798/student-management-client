export default function shortenText(txt) {
  return `${txt.split('').slice(0, 60).join('')}...`;
}
