<template>
  <v-container>
    <v-layout column>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="ma-2"
    >

      <v-select
        v-model="select"
        solo
        single-line
        outlined
        clearable
        flat
        small-chips
        :items="items"
        label="가지"
        required
        dense
        hide-selected
        color="#BDBDBD"
        class="ml-2 mr-2"
        style="max-width:250px;"
      ></v-select>

      <v-text-field
        v-model="name"
        solo
        single-line
        clearable
        flat
        label="제목을 입력하세요"
        required
        class="text-lg-h5"
      ></v-text-field>

      <v-divider class="ml-2 mr-2"></v-divider>
      
      <v-textarea
        v-model="email"
        solo
        no-resize
        flat
        required
        class="mt-6"
      ></v-textarea>
  
      <v-checkbox
        v-model="checkbox"
        solo
        single-line
        clearable
        flat
        color="#BDBDBD"
        label="비공개"
        required
      ></v-checkbox>
      <div class="align-end d-flex flex-row-reverse">
        <v-btn
        rounded
        flat
        outlined
        color="#827717"
        @click="resetValidation"
      >
        생성
      </v-btn>
      <v-btn
        rounded
        flat
        outlined
        color="#BDBDBD"
        class="mr-4"
        @click="reset"
      >
        임시저장
      </v-btn>
      </div>
    </v-form>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        name: '',
        email: '',
        select: null,
        items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        ],
        checkbox: false,
    }),

    methods: {
        validate () {
        this.$refs.form.validate()
        },
        reset () {
        this.$refs.form.reset()
        },
        resetValidation () {
        this.$refs.form.resetValidation()
        },
    }
}
</script>