const querify = (queryObj) => {
  if (queryObj && Object.values(queryObj).filter(q => q).length > 0) {
    const newQueryObj = Object.entries(queryObj).filter(([_, v]) => v).reduce((s, c) => ({ ...s, [c[0]]: c[1] }), {})
    return new URLSearchParams(newQueryObj).toString()
  }
  return ''
}

export default querify
