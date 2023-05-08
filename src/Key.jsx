export default function Key({text}) {
  let special = ''
  if (text.length > 1) special = 'special-key'
  return <button className={`key ${special}`}>{text}</button>
}