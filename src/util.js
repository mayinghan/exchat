//utilities
export function getRedirectPath({type, avatar}){
	// redirect based on user info
	// user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo 
  
  var url = (type==='expert')?'/expert': '/user'
  if(type === 'expert' && !avatar) {
    url += 'info'
  }
	return url
}
