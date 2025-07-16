document.addEventListener("DOMContentLoaded", function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxHESS-Lv0LqBouvJ69hkt87eSSqF6ZD_qPaNrb9aTaqi293AdIKftKPkgUWFY1apNY/exec'; // URL'niz
    const form = document.getElementById("rsvp-form");
    const formCard = document.querySelector(".form-card");
    const tesekkurDiv = document.getElementById("tesekkur");

    // --- YENİ EKLENEN KONTROL ---
    // Sayfa yüklendiğinde, tarayıcı hafızasını kontrol et
    if (localStorage.getItem('yanitGonderildi') === 'true') {
        // Eğer daha önce yanıt gönderilmişse, formu direkt gizle ve teşekkür mesajını göster
        form.style.display = 'none'; // formu gizle
        tesekkurDiv.classList.remove('hidden');
    }
    // --- KONTROL SONU ---


    const submitButton = form.querySelector("button[type='submit']");
    const katilimRadios = document.querySelectorAll("input[name='katilim']");
    const notlarDiv = document.getElementById("notlar");

    katilimRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            if (this.value === "Katılamıyorum") {
                notlarDiv.classList.add("visible");
            } else {
                notlarDiv.classList.remove("visible");
            }
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Gönderiliyor...';

        const formData = new FormData(form);
        formData.append("apiKey", "ApartmanToplantisiicinGizliSifre123"); // Güvenlik anahtarınız

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                console.log('Success!', response);

                // --- YENİ EKLENEN İŞARET ---
                // Başarılı gönderimden sonra tarayıcı hafızasına not bırak
                localStorage.setItem('yanitGonderildi', 'true');

                form.classList.add("fade-out");
                form.addEventListener("transitionend", function handler() {
                    form.removeEventListener("transitionend", handler);
                    form.classList.add("hidden");
                    tesekkurDiv.classList.remove("hidden");
                }, { once: true });
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Hata: Form gönderilemedi. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
                submitButton.disabled = false;
                submitButton.textContent = 'Yanıtımı Gönder';
            });
    });
});