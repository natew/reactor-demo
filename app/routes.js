
function page(name) {
  return './pages/' + name;
}

module.exports = {

  '/': require(page('home')),

  '/tutorial/:name': require(page('tutorial')),

  500: require(page('error'))

}