<template>
  <!-- when using a component in a template Vue.js expects the DOM element to be
  lowercased and dasherized. e.g. ProductList -> product-list -->
  <section>
    <save-product-form
      :product="productInForm"
      @submit="onFormSave"
      @cancel="onFormCancel">
    </save-product-form>
    <product-list
      @edit="onEditClicked"
      @remove="onRemoveClicked"
      :products="products">
    </product-list>
  </section>
</template>

<script>
import ProductList from './components/product-list';
import SaveProductForm from './components/save-product-form';
import uuid from 'uuid';

const initalData = () => {
  return {
    productInForm: {
      id: null,
      name: '',
      description: '',
      price: null,
    },
    products: [
      {
        id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
        name: 'COBOL 101 vintage',
        description: 'Learn COBOL with this vintage programming book',
        price: 399,
      },
      {
        id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
        name: 'Sharp C2719 curved TV',
        description: 'Watch TV like never before with the brand new curved screen technology',
        price: 1995,
      },
      {
        id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
        name: 'Remmington X mechanical keyboard',
        description: 'Excellent for gaming and typing, this Remmington X '
        + 'keyboard features tactile, clicky switches for speed and accuracy',
        price: 595,
      },
    ],
  }
}
export default {
  components: {
    ProductList,
    SaveProductForm,
  },
  data: initalData,
  methods: {
    onFormSave(productData) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products.splice(index, 1, product);
      } else {
        productData.id = uuid.v4();
        this.products.push(productData);
      }
      this.resetProductInForm();
    },
    onFormCancel() {
      this.resetProductInForm();
    },
    onEditClicked(product) {
      console.log('edit', product)
      this.productInForm = { ...product };
    },
    onRemoveClicked(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      console.log('remove', index, product)
      if (index !== -1) {
        this.products.splice(index, 1);
        if(product.id === this.productInForm.id) {
          this.resetProductInForm();
        }
      }
    },
    resetProductInForm() {
      this.productInForm = initalData().productInForm;
    }
  },
}
</script>
