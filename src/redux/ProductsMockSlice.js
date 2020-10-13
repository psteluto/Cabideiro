import {createSlice} from '@reduxjs/toolkit';

const productsMockSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    historyProducts: [
      {
        id: 1,
        status: "Em separação",
        name: "Vestido Curto",
        color: "Preto",
        owner: "Luciana Aparecida",
        devolutionDate: "20/10/2020",
        rentValue: 50,
        image: "https://app-cabideiro.s3.amazonaws.com/b8fc7822-3a8b-4073-8e3c-c358d0f4e58e.jpg"
      },{
        id: 2,
        status: "Enviado",
        name: "Macacão Longo",
        color: "Branco",
        owner: " Luiza Cassiano",
        devolutionDate: "20/10/2020",
        rentValue: 100,
        image: "https://app-cabideiro.s3.amazonaws.com/ed9382a1-f502-4370-9e33-4e6d44f9da69.jpg\n"
      },{
        id: 3,
        status: "Entregue",
        name: "Saia Longa",
        color: "Azul",
        owner: "Luiza Cassiano",
        devolutionDate: "20/10/2020",
        rentValue: 180,
        image: "https://app-cabideiro.s3.amazonaws.com/e6a4efc4-9fb3-43d0-9da1-bea60902aa63.jpg"
      },{
        id: 4,
        status: "Devolvido",
        name: "Vestido Curto",
        color: "Vermelho",
        owner: "Luiza Cassiano",
        devolutionDate: "10/10/2020",
        rentValue: 90,
        image: "https://app-cabideiro.s3.amazonaws.com/e56d551a-7801-4de0-9873-fa2dd692c109.jpg"
      }
    ],
    incomeProducts: []
  },
  reducers: {
    addProduct: (state, action) => {
      state.historyProducts.unshift(action.payload);
    },
    changeStatus: (state, action) => {
      const newProducts = state[action.payload.target].map(prod => {
        if (prod.id === action.payload.id)
          prod.status = action.payload.status
        return prod;
      })
      state[action.payload.target] = newProducts;
    },
    setIncomeProducts: (state, action) => {
      state.incomeProducts = action.payload
    }
  }
});

export const {addProduct, changeStatus, setIncomeProducts} = productsMockSlice.actions;

export default productsMockSlice.reducer;