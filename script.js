document.addEventListener("DOMContentLoaded", function () {
    // --- Google Apps Script URL'iniz ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxHESS-Lv0LqBouvJ69hkt87eSSqF6ZD_qPaNrb9aTaqi293AdIKftKPkgUWFY1apNY/exec';

    const form = document.getElementById("rsvp-form");
    const submitButton = form.querySelector("button[type='submit']");
    const katilimRadios = document.querySelectorAll("input[name='katilim']");
    const notlarDiv = document.getElementById("notlar");
    const tesekkurDiv = document.getElementById("tesekkur");

    // Katılım durumuna göre notlar kısmını pürüzsüzce göster/gizle
    katilimRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            if (this.value === "Katılamıyorum") {
                notlarDiv.classList.add("visible");
            } else {
                notlarDiv.classList.remove("visible");
            }
        });
    });

    // Form gönderildiğinde verileri Google Sheets'e gönder
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        // Kullanıcının birden çok kez tıklamasını önlemek için butonu devre dışı bırak
        submitButton.disabled = true;
        submitButton.textContent = 'Gönderiliyor...';

        // fetch API'si ile form verilerini Google Apps Script'e gönder
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                console.log('Success!', response);
                
                // Gönderim başarılıysa, formu gizle ve teşekkür mesajını göster
                form.classList.add("fade-out");
                form.addEventListener("transitionend", function handler() {
                    form.removeEventListener("transitionend", handler);
                    form.classList.add("hidden");
                    tesekkurDiv.classList.remove("hidden");
                }, { once: true });

                // Formu sıfırlayarak tarayıcı geri geldiğinde boş olmasını sağla
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                
                // Hata durumunda kullanıcıyı bilgilendir
                alert('Hata: Form gönderilemedi. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');

                // Kullanıcının tekrar deneyebilmesi için butonu tekrar aktif et
                submitButton.disabled = false;
                submitButton.textContent = 'Yanıtımı Gönder';
            });
    });
});