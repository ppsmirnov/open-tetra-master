import './index.scss';
import React, {Component} from 'react';
import {render} from 'react-dom';

const svg = require('!raw!./test.svg');

const applyDiscount = (discountAmount, products) => {
    const pricePerUnit = discountAmount/products.reduce((sum, value) => sum + value.price, 0);
    var maxIndex = 0, maxValue = 0, totalDiscount = 0, maxPriceWithDiscount = 0;
    const newProducts = products.map((value, index) => {
        const price = value.price;
        const discount = Math.floor(price * pricePerUnit);
        const priceWithDiscount = price - discount;
        totalDiscount += discount;
        if(maxValue < price) {
            maxValue = price;
            maxIndex = index;
            maxPriceWithDiscount = priceWithDiscount;
        }


        return {...value, priceWithDiscount}
    });
    newProducts[maxIndex].priceWithDiscount = maxPriceWithDiscount + ( - discountAmount + totalDiscount);
    return newProducts;
};

export default class TestApp extends Component {
    constructor() {
        super();
        this.state = {
            products: [{name: 'Tелефон', price: 100}, {name: 'Магнитофон', price: 200}, {name: 'Миелофон', price: 400}],
            discount: 7
        };

        this.updateProducts = () => {
            const name = this.refs.name.value;
            const price = parseInt(this.refs.price.value);
            this.setState({products: [...this.state.products, {name, price}]})
        }

        this.updateDiscount = () => {
            this.setState({discount: parseInt(this.refs.discount.value)})
        }
    }

    render() {
        const products = applyDiscount(this.state.discount, this.state.products);
        console.log(products);
        return <div className = 'test-app'>
            <div className = 'test-app__left'>
                <div className = 'test-app-form' >
                    <h2>Добавить продукт</h2>
                    <label>Продукт:</label>
                    <input type="text" ref = 'name' className = {'test-app-form__name'}/>
                    <label>Цена:</label>
                    <input type="text" ref = 'price' className = {'test-app-form__price'}/>
                    <input type="submit" value = "Добавить" onClick = {this.updateProducts} />
                </div>

                <div className = 'test-app-table'>
                    <h2>Корзина</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>  Продукт</th>
                            <th>  Цена </th>
                            <th> Цена со скидкой</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((p, id) => <tr key = {id}>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.priceWithDiscount}</td>
                        </tr>)}


                        </tbody>
                    </table>
                </div>

                <div className = 'test-app-discount'>
                    Применить скидку:
                    <input type="text" ref = 'discount' className = 'test-app-discount__input'/> рублей.
                    <input type="submit" value = 'Применить' onClick = {this.updateDiscount}/>
                </div>
            </div>


            <div className = 'test-app__right'>
                <div className = 'test-app-tip'>
                    <span className = 'test-app-tip__content'>
                    C помощью этой формы вы можете добавить товары в корзину
                        </span>
                    <div dangerouslySetInnerHTML = {{__html: svg}}></div>

                </div>

                <div className = 'test-app-tip'>
                    <span className = 'test-app-tip__content'>
                        Скидка для каждой позиции рассчитывается пропрционально цене товара. Скидка всегда в рублях без копеек.
                        Сумма скидок по каждому товару всегда точно равно общей сумме. При округлении остаток суммы применяется к самому дорогому товару в корзине.
                    </span>
                    <div dangerouslySetInnerHTML = {{__html: svg}}></div>
                </div>
            </div>
        </div>
    }
}

$(() => render(<TestApp /> , document.querySelector('#test-app')));