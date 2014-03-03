
function page(name) {
  return './pages/' + name;
}

module.exports = {

  '/': require(page('home')),

  '/tutorials/:name/:step?/:num?': require(page('tutorial')),

  500: require(page('error'))

}