//utilities
export function getRedirectPath({type, avatar}){
	// redirect based on user info
	// user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo 
  
  var url = (type==='expert')?'/user': '/expert'
  if(type === 'expert' && !avatar) {
    url += 'info'
  }
  if(type === 'user' && !avatar) {
    url += 'info'
  }
	return url
}


//get chat id
export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('|');
}
