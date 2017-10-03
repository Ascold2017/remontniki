;
"use strict";
$(document).ready(function () {
    //Счетчик и сбор информации
    $(function () {
        //Инпут с итоговой стоимостью за все позиции
        var total_input = $(".price_sum_container .form_counter__input");
        //Стоимость кв.м начальная 
        var perM2 = parseFloat($(".home__price span").text());
        //Cчетчик квадратуры
        var quadratureCounter = $(".quadrature_counter .form_counter__input");
        var quadrature = quadratureCounter.val();


        //Подсчитываем данные калькулятора
        var sumCounter = function () {

            //Подсчитываем доп услуги за м2
            var allItems = $(".calculator_price__item:not(.title)");
            //Инпут для отправки данных на бэк
            var inputForSelectItems = $(".calculator_input__hidden");
            //Сумма выбранных элементов
            var sumForSelctedItems = 0;
            //Информация о выбранных элементах
            var selectInfo = 'Квадратура: ' + quadrature + '\n';
            allItems.each(function () {
                var $this = $(this);
                if ($this.find(".price__counter .form_counter__input").val() > 0) {
                    var price_one = $this.find(".price__price").text()
                    var re = /\D+/ig;
                    var currentSum = 0;
                    price_one = price_one.replace(re, '');
                    //Если выбранный элемент - одноразовая услуга (чекбокс)
                    if ($this.find(".price__counter .form_counter").hasClass("single1")) {
                        currentSum = parseFloat(price_one);
                        sumForSelctedItems += currentSum;
                        //Записываем стоимость услуги в поле стоимости этой услуги
                        $this.find(".price__total .form_counter__input").val(currentSum);
                    }
                    //Если стоимость вычисляется по квадратуре
                    else {
                        currentSum = parseFloat(price_one) * quadrature;
                        sumForSelctedItems += currentSum;
                        //Записываем стоимость услуги в поле стоимости этой услуги
                        $this.find(".price__total .form_counter__input").val(currentSum);
                    }

                    selectInfo +=
                        $this.find(".price__title").text() + ' ' +
                        quadrature +
                        $this.find(".price__em").text() + ' ' +
                        $this.find(".price__total .form_counter__input").val() + '\n';
                }
                else{
                    //Записываем стоимость услуги в поле стоимости этой услуги
                        $this.find(".price__total .form_counter__input").val(0);
                }
            });
            total_input.val(sumForSelctedItems + quadrature * perM2);
            inputForSelectItems.attr('value', selectInfo);
            inputForSelectItems.change();
            //console.log();
        }
        quadratureCounter.on('change', function () {
            quadrature = $(this).val();
            sumCounter();
        });
        $(".price__counter .form_counter__input").each(function () {
            $(this).on('change', function () {
                sumCounter();
            });
        });
    });
});
