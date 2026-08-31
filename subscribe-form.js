let formLoaded=false;document.querySelector('#subscriptionForm').addEventListener('load',()=>{if(formLoaded)window.parent.postMessage({type:'webpanel-subscription-submitted'},'*');formLoaded=true});
