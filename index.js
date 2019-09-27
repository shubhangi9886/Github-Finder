$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
      let username= e.target.value;
  
  $.ajax({
   url:'https://api.github.com/users/'+username,
   data:{
       client_id:'41a58fe625be9492a363',
       client_secret:'759c1600c026a7ba644af24a493f84d729ed7590'
      }
  }).done(function(user){
    $.ajax({
      url:'https://api.github.com/users/'+username+'/repos',
      data:{
          client_id:'6452edbd1565e46eaf0d',
          client_secret:'686974541a6fe6b3fc4f3373cede2673597e1c4d'
         }
     }).done(function(repo){
       $.each(repo,function(index,rep){
         $('#repos').append(`
         <div class="well">
         <div class="row">
         <div class="col-md-4 col">
         <p>${rep.name}<p>
         </div>
         <div class="col-md-5 col">
         <span class="labels label-defaulta">fork:${rep.forks_count}</span>
         <span class="labels label-defaultb">Public Gists:${rep.watchers_count}</span>
         <span class="labels label-defaultc">followers:${rep.stargazers_count}</span>
         
         </div>
         <div class="col-md-8 col">
         <a href="${rep.html_url}" target"_blank" class="btn btn-default">repo page</a>
         </div>
         </div>
         </div>
       `)
       });
     });
      $('#profile').html(`
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${user.name}</h3>
      </div>
      <div class="panel-body">
          
            <div class="col-md-3 pp">
              <img class="thumbnail" src="${user.avatar_url}"><br>
              
              <div class="target">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
            </div>
      <div class="col-md-9 pp">
        <button class="label label-default">Public Repos: ${user.public_repos}</button>
        <button class="label label-default1">Public Gists: ${user.public_gists}</button>
        <button class="label label-default2">Followers: ${user.public_followers}</button>
        <button class="label label-default3">Following: ${user.public_following}</button>
      <br><br>
    <ul>
    <li class="list-group-item">company:${user.company}</li>
    <li class="list-group-item">website/blog:${user.blog}</li>
    <li class="list-group-item">location:${user.location}</li>
    <li class="list-group-item">member since:${user.created_at}</li>
    </ul>
      </div>
        </div>
          
    
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <hr>
      <div id="repos"></div>
    
      `);

  });
});
});
