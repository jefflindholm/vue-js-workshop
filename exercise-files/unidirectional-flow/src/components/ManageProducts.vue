<template>
  <section>
    <save-product-form
      :product="productInForm"
      v-on:submit="onFormSave"
      v-on:cancel="resetProductInForm"
    ></save-product-form>
    <product-list
      :products="products"
      v-on:edit="onEditClicked"
      v-on:remove="onRemoveClicked"
    ></product-list>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import uuid from 'uuid';
import ProductList from './ProductList';
import SaveProductForm from './SaveProductForm';

const initialData = () => {
 return {
   productInForm: {
     id: null,
     name: '',
     description: '',
     price: null
   },
 }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  data: initialData,
  computed: mapGetters({
    products: 'getProducts',
  }),
  methods: {
    ...mapActions([
      'saveProduct',
      'deleteProduct',
    ]),
    onFormSave(product) {
      this.saveProduct(product);

      this.resetProductInForm();
    },
    resetProductInForm() {
      this.productInForm = initialData().productInForm;

    },
    onEditClicked(product) {
      // since objects are passed by reference we need to clone the product
      // either by using Object.assign({}, product) or by using object
      // spread like we do here.
      this.productInForm = { ...product };
    },
    onRemoveClicked(product) {
      this.deleteProduct(product);

      if (product.id === this.productInForm.id) {
        this.resetProductInForm();
      }
    }
  }
}
</script>
