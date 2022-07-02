export default function resolveIconPath(iconName) {
  const icons = require.context('../assets/icons/', false, /\.svg$/)

  return icons(`./${iconName}.svg`)
}

