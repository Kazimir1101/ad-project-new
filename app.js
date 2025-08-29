$(document).ready(function(){
    $('#hamburder-search-btn').click(function(){
        $('.search-box').slideToggle(300);
        $('.search-box').css('display', 'flex');
    });

    $('.category').click(function() {
        $('.category').removeClass('category-active');  
        $(this).addClass('category-active');        
    });

    $('#menu-catalog-btn').click(function(){
        $('.categories').toggleClass('categories-active');
    });

    $('#hamburder-catalog-btn').click(function(){
        if ($(window).width() < 525) {
        $('.categories').toggleClass('categories-active');
    }
    });

    $('.vip-ad').mouseover(function(){
        $('.vip-ad').removeClass('vip-ad-hovered');  
        $(this).addClass('vip-ad-hovered');  
    });
   
    $(document).ready(function () {
    const items = [
        {
            text: "Bölgəmizin ilk online alış-satış platformasına xoş gəlmisiniz!",
            img: "/images/mountain.png"
        },
        {
            text: "Minlərlə məhsul sizi gözləyir",
            img: "/images/all-goods.png"
        },
        {
            text: "Elanını cəmi 1 dəqiqəyə yarat",
            img: "/images/alert.png"
        },
        {
            text: "Rahat axtarış – sənə lazım olanı tap",
            img: "/images/search-image.png"
        },
        {
            text: "Yüzlərlə fərqli məhsul – hamısı bir arada!",
            img: "/images/all-goods.png"
        }
    ];

    let index = 0;

    function updateCarousel() {
        const nextItem = items[index];
        const $text = $('.carousel-box-text h3');
        const $img = $('.carousel-box-img img');

        // Плавно скрыть текст и картинку
        $text.fadeOut(300);
        $img.fadeOut(300, function () {
            // После скрытия — заменить контент
            $text.text(nextItem.text);
            $img.attr('src', nextItem.img);

            // Плавно показать обратно
            $text.fadeIn(300);
            $img.fadeIn(300);
        });

        index = (index + 1) % items.length;
    }

    // Первоначальная загрузка
    updateCarousel();

    // Каждые 4 секунды обновлять
    setInterval(updateCarousel, 5000);
   });

    $(".category").click(function(){
        let id = $(this).data("id");
        window.location.href = "/searchresult/searchresult.html?id=" + id;
    });


   // Выводим на главную страницу ВИП товары
    $.ajax({
        url: "http://localhost:8085/api/products/vip",
        type: "GET",
        success: function(data){
            let container = $(".vip-ads-box");
            container.empty(); // очищаем блок, если там что-то есть

            data.forEach(function(p){
                let imgSrc = (p.images && p.images.length > 0) ? p.images[0] : '/images/no-image.png';

                let productHtml = 
                              `<div class="simple-ad" onclick="window.location.href='/productpage/productpage.html?id=${p.id}'"> 
                            <div class="simple-ad-img">
                                <img src='${imgSrc}' alt="${p.name}">
                            </div>
                            <div class="simple-ad-info">
                                <h4>${p.price} <span class="mini-money-logo">₼</span></h4>
                                <h6 class="simple-ad-name">${p.name}</h6>
                                <div class="simple-ad-footer">
                                    <p>${p.place}</p>
                                    <p>${new Date(p.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        `;
                container.append(productHtml);
            });
        },
        error: function(){
            console.log("Ошибка при загрузке VIP товаров");
        }
    });

    //
  
    $("#menu-search-btn").click(function () {
        let query = $("#menu-search-input").val().trim();
        if (query.length > 0) {
            // передаем текст через URL
            window.location.href = "/searchresult/searchresult.html?query=" + encodeURIComponent(query);
        }
    });


    // Поиск с поля search-box-input
    $('#search-box-btn').click(function() {
        let query = $('#search-box-input').val().trim();
        if (!query) {
            alert("Axtardığınız məhsulun adını yazın");
            return;
        }

        // Перенаправление на страницу searchresult.html с параметром query
        window.location.href = "/searchresult/searchresult.html?query=" + encodeURIComponent(query);
    });

    // Также поиск при нажатии Enter в поле
    $('#search-box-input').keypress(function(e) {
        if (e.which === 13) { // клавиша Enter
            $('#search-box-btn').click();
        }
    });

    //



});

