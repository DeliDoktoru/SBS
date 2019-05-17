
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