<template>
  <form>
    <div class="form-group">
      <label for="productName">Product Name</label>
      <input type="text"
        v-model="product.name"
        class="form-control"
        id="productName"
        maxlength="32"
        placeholder="Enter product name">
    </div>
    <div class="form-group">
      <label for="productDescription">
        Product Description <small class="text-muted">(optional)</small>
      </label>
      <textarea id="productDescription"
                v-model="product.description"
                rows="3"
                class="form-control"
                maxlegnth="128"
                placeholder="Enter description">
      </textarea>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="text"
             v-model="product.price"
             class="form-control"
             placeholder="Enter price"
             id="price">
    </div>
    <button class="btn btn-primary"
            type="submit"
            @click.prevent="onSubmit">
      {{ product.id ? 'Update product' : 'Add product' }}
    </button>
    <button v-if="product.id" class="btn btn-cancel" @click="onCancel">Cancel</button>
  </form>
</template>
<script>
const baseData = () => {
  return {
    id: null,
    error: null,
  }
}
export default {
  data: baseData,
  props: ['product'],
  methods: {
    onSubmit() {
      this.$emit('submit', this.product);
    },
    onCancel() {
      this.$emit('cancel');
    }
  },
  beforeUpdate() {
    if (this.id !== this.product.id) {
      this.$el = null;
      this.id = this.product.id;
      console.log('update')
    }
  }
}
</script>
<style>
</style>
