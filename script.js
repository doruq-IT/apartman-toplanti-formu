document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("rsvp-form");
    const formCard = document.querySelector(".form-card");
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

    // Form gönderildiğinde pürüzsüz geçiş yap
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form verilerini al (bu kısım aynı)
        const adSoyad = document.getElementById("adSoyad").value;
        const daireNo = document.getElementById("daireNo").value;
        const katilim = document.querySelector("input[name='katilim']:checked").value;
        const ekNot = document.getElementById("ekNot").value;
        
        console.log("Form gönderildi:", { adSoyad, daireNo, katilim, ekNot });

        // Formu yavaşça gizle
        form.classList.add("fade-out");

        // CSS geçiş animasyonu bittiğinde teşekkür mesajını göster
        form.addEventListener("transitionend", function handler() {
            // Event listener'ı tekrar tetiklenmemesi için kaldır
            form.removeEventListener("transitionend", handler);
            
            form.classList.add("hidden"); // display: none yap
            tesekkurDiv.classList.remove("hidden"); // teşekkür mesajını görünür yap
        }, { once: true }); // Olayın sadece bir kez çalışmasını sağlar
    });
});