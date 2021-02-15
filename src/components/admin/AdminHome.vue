<template>
	<div>
		<h4>
			Домашняя страница панели администратора.
		</h4>
		<p>
			*перед загрузкой удалить данные из базы
		</p>
		<button class="btn" @click.prevent="loadProd">загрузить продукты</button>
		<button class="btn">загрузить категории</button>
	</div>
</template>

<script>
import db from '../../../db.json'
import { useStore } from 'vuex'

export default {
	name: 'AdminHome',
	setup() {
		const store = useStore()
		const baseProd = db.products
		const baseCat = db.categories

		const loadProd = () => {
			const count = baseProd.length
			let i = 0
			setInterval(() => {
				if (i < count) {
					const body = baseProd[i]
					delete body.id
					store.dispatch('products/saveProduct', body)
					i++
				} else {
					return
				}
			}, 1000)
		}

		const loadCat = () => {
			const count = baseCat.length
			let i = 0
			setInterval(() => {
				if (i < count) {
					const body = baseCat[i]
					delete body.id
					store.dispatch('products/saveCategory', body)
					i++
				} else {
					return
				}
			}, 1000)
		}

		return {
			loadProd,
			loadCat,
		}
	},
}
</script>
