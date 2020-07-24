import { createStore } from 'redux'
import toggleFavorite from './favoriteReducer'

export default createStore(toggleFavorite);