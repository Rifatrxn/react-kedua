import { useState } from 'react'
import './App.css'

const PRODUK = [
  { id: 1, nama: 'Kopi Susu', harga: 15000, emoji: '☕' },
  { id: 2, nama: 'Teh Manis', harga: 8000, emoji: '🍵' },
  { id: 3, nama: 'Roti Bakar', harga: 12000, emoji: '🍞' },
  { id: 4, nama: 'Mie Goreng', harga: 13000, emoji: '🍜' },
]

export default function App() {
  const [cart, setCart] = useState([])

  const tambah = (p) => setCart([...cart, p])
  const hapus = (i) => setCart(cart.filter((_, idx) => idx !== i))
  const total = cart.reduce((s, p) => s + p.harga, 0)

  const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID')

  return (
    <div className="page">
      <header>
        <h1>🛒 Warung Simpel</h1>
        <p>Katalog produk + keranjang — React useState</p>
      </header>

      <main className="layout">
        <section>
          <h2>Daftar Produk</h2>
          <div className="grid">
            {PRODUK.map(p => (
              <div key={p.id} className="card">
                <div className="emoji">{p.emoji}</div>
                <b>{p.nama}</b>
                <span>{rupiah(p.harga)}</span>
                <button onClick={() => tambah(p)}>+ Keranjang</button>
              </div>
            ))}
          </div>
        </section>

        <aside className="card cart">
          <h2>Keranjang ({cart.length})</h2>
          {cart.length === 0 && <p className="muted">Masih kosong.</p>}
          {cart.map((p, i) => (
            <div key={i} className="item">
              <span>{p.emoji} {p.nama} — {rupiah(p.harga)}</span>
              <button className="del" onClick={() => hapus(i)}>x</button>
            </div>
          ))}
          <hr />
          <b>Total: {rupiah(total)}</b>
          <button
            className="checkout"
            disabled={cart.length === 0}
            onClick={() => { alert('Pesanan ' + rupiah(total) + ' diterima!'); setCart([]) }}
          >
            Checkout
          </button>
        </aside>
      </main>
    </div>
  )
}
