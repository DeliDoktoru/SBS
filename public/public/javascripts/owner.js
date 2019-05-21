
  $(document).ready(function(){
    $('.phone').mask('(000) 000-0000');
  });
  $('form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });
  function toDashboard(obj=null){
    if(obj){
      showNotification('top','right',obj.color,obj.message);
    }
    location.href="/dashboard";
  }
  function kayitBasarili(obj){
    if(obj){
      var successHtml=`
      <div class="col-lg-8 col-md-12 m-auto">
        <div class="jumbotron text-xs-center">
          <h1 class="display-3">${obj.message.title}</h1>
          <p class="lead"><strong>${obj.message.content}</p>
          <hr>
          <p>
          ${obj.message.footer} <a href="">${obj.message.contactus}</a>
          </p>
          <p class="lead">
          <a class="btn btn-info btn-round mb-3 btn-sm " href="login" role="button">${obj.message.continuelogin}</a>
          </p>
        </div>
      </div>`;
      $("#msform").parent().parent().html(successHtml);
    }
    else{
      showNotification('top','right',"danger","Bir hata oluştu");
    }
   
  }
  function Dynajax(link,key="",callback,checkControls=true,data){
    if(checkControls){
      if(controls()) return;
    }
    var _data={};
    if(key!=""){
      kdata={};
      $(`[ajax-key=${key}]`).each(function(){
        var type=$(this).attr("type");
        var name=$(this).attr("name");
        if(type=="radio"){
          kdata[name]=$(`[ajax-key=${key}][name=${name}]:checked`).attr("radio-value");
        }else{
          kdata[name]=$(this).val();
        }
      });
      _data.kdata=JSON.stringify(kdata)
    }
    if(data){
      _data.ndata=JSON.stringify(data);
    }
    $.ajax({
      type: "POST",
      url: "/ajax/"+link,
      dataType: "json",
      data: _data,
      success: function (result) {
        if (result.status){
          if(callback && typeof(callback)=="function") {
            callback(result);
          }
        } 
        else {
          showNotification('top', 'right', result.color, result.message);
        }
      },
      error: function (jqXHR, exception) {
        console.log(jqXHR);
        console.log(exception);
      }
    });
    
  }

  /* #region  dil değişikliği */
  $("body").delegate("#languages", "change", function () {
    $.ajax({
      type: "POST",
      url: "/ajax/changeLanguage",
      dataType: "json",
      data: {
        language: this.value
      },
      success: function () {
        location.reload();
      },
      error: function (jqXHR, exception) {
        console.log(jqXHR);
        console.log(exception);
      }
    });
    
  });
  /* #endregion */
  
  /* #region  show password */
  var selectedPassword;
  $(document).mouseup(function(){
    $(selectedPassword).attr("type","password");
    selectedPassword=null;
    return false;
  });

  $("body").delegate(".showpass", "mousedown", function () {
    selectedPassword=$(this).parent().find("input[type='password']");
    $(selectedPassword).attr("type","text");
  });
  /* #endregion */

  /* #region  şifreler eşleşme kontrolü */
  function isPasswordMatch(){
    var passwords=$("[type='password']:visible");
    if($(passwords).length==2){
      if($(passwords).eq(0).val() == $(passwords).eq(1).val()){
          return false;
      }
      else{
        showNotification('top', 'right', 'danger', 'Şifreler eşleşmedi!');
        $(passwords).css("border-bottom", "2px solid red");
        return true;
      }
    }
    else{
      return false;
    }

  }
  /* #endregion */
  /* #region  zorunlu alan kontrolu */
function enforcedControl() {
    var result = false;
    $("[enforced]:visible").each(function () {
      if ($(this).val() == "" || $(this).val() == undefined || $(this).val() == null) {
        result = true;
        $(this).css("border-bottom", "2px solid red");
      }
  
    });
    if (result)
      showNotification('top', 'right', 'danger', 'Zorunlu alanları doldurmanız gerekmektedir.');
    return result;
  }
  $("body").delegate("[enforced]", "change keyup paste", function () {
    if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null)
      $(this).css("border-bottom", "");
  });
  /* #endregion */
  /* #region  max min kontrolu */
function maxMinControl() {
    var result = false,
      kucuk = false,
      buyuk = false,
      fazlaKarakter = false,
      azKarakter = false;
    $("[max]:visible,[min]:visible").each(function () {
      if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null) {
        if ($(this).attr("max") != undefined) {
          var _max = parseInt($(this).attr("max"));
  
          if ($(this).attr("type") == "number") {
            var tmp = parseInt($(this).val());
            if (!isNaN(_max) && !isNaN(tmp) && tmp > _max) {
              $(this).css("border-bottom", "2px solid red");
              buyuk = true;
              result = true;
            }
          } else {
            if (!isNaN(_max) && $(this).val().length > _max) {
              $(this).css("border-bottom", "2px solid red");
              fazlaKarakter = true;
              result = true;
            }
  
          }
  
        }
        if ($(this).attr("min") != undefined) {
          _min = parseInt($(this).attr("min"));
          if ($(this).attr("type") == "number") {
            var tmp = parseInt($(this).val());
            if (!isNaN(_min) && !isNaN(tmp) && tmp < _min) {
              $(this).css("border-bottom", "2px solid blue");
              kucuk = true;
              result = true;
            }
          } else {
            if (!isNaN(_min) && $(this).val().length < _min) {
              $(this).css("border-bottom", "2px solid blue");
              azKarakter = true;
              result = true;
            }
          }
        }
      }
    });
    if (azKarakter)
      showNotification('top', 'right', 'info', 'Girdiğiniz Karakter Sayısı Yeterli Değil.');
    if (fazlaKarakter)
      showNotification('top', 'right', 'danger', 'Girdiğiniz Karakter Sayısı Çok Fazla.');
    if (kucuk)
      showNotification('top', 'right', 'info', 'Girdiğiniz Değer Yeterli Değil.');
    if (buyuk)
      showNotification('top', 'right', 'danger', 'Girdiğiniz Değer Fazla.');
    return result;
  }
  $("body").delegate("[enforced]", "change keyup paste", function () {
    if ($(this).val() != "" && $(this).val() != undefined && $(this).val() != null)
      $(this).css("border-bottom", "");
  });
  /* #endregion */
  /* #region  bütün kontroller */
function controls() {
    return (enforcedControl() || maxMinControl() || isPasswordMatch())
  }
  /* #endregion */