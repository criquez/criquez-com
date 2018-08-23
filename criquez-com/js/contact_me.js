$(function() {
  $("form").submit(function() {
    var nom = $("input#nom").val();
    var prenom = $("input#prenom").val();
    var email = $("input#email").val();
    var message = $("textarea#message").val();
    var form_data = new FormData();                   
    form_data.append('nom', nom);
    form_data.append('email', email);
    form_data.append('prenom', prenom);
    form_data.append('message', message);
    $.ajax({
      url: "./php/contact_me.php",
      dataType: 'text',  // what to expect back from the PHP script, if anything
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                         
      type: 'post', 
      data: form_data,  // on passe le form crée plus haut
      success: function(php_script_response) {
        if(php_script_response.indexOf('ok') >= 0){
          /*alert("ok");*/
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-success').append("<strong>Votre message à bien été envoyé.</strong>");
          $('#success > .alert-success').append('</div>');
          $('#contactForm').trigger("reset");
        }
        else{
          alert(php_script_response);
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append("<strong>Veuillez nous excuser " + prenom + ", l'erreur suivante s'est produite : '"+php_script_response+"'.");
          $('#success > .alert-danger').append('</div>');
          $('#contactForm').trigger("reset");
        }
      },
      error: function() {
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append("<strong>Veuillez nous excuser " + prenom + ", il semble que notre serveur de courrier ne répond pas. Veuillez réessayer plus tard !");
          $('#success > .alert-danger').append('</div>');
          $('#contactForm').trigger("reset");
          alert("ko") ;
      },
    })
    return false;
  })
})