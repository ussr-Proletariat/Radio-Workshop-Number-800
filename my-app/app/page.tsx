"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nick, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Зарегистрирован!");
      dialogRef.current?.close();
      router.push("/verstak")
    } else {
      alert(data.error);
    }
  }
  
  
  return (
    <div>
      <main>
    <h2>Приветствую тебя товарищь радиолюбитель в радио мастерской номер 800</h2>
    <p>Сайт полностью анонимный. Для работы сним нужно будет зарегистрироваться но там попросят тебя товарищь толко придумать ник и пароль</p><br />

    <img src="/инжинер2.gif" alt="инжинер" /><br />
    
    <button onClick={() => dialogRef.current?.showModal()}>
      Зарегистрироваться
    </button>



<dialog ref={dialogRef}>

  <button onClick={() => dialogRef.current?.close()}>
    Я передумал(а) регистрироваться</button>
    <h1>Регистрация</h1>

  <form onSubmit={handleSubmit}>
    <label htmlFor="nik">Ник: (Мин.4, Макс.20)</label>
    <input
      id="nik"
      value={nick}
      onChange={(e) => setNick(e.target.value)}
      minLength={4}
      maxLength={20}
      size={20}
      type="text"
      required
    /><br />

    <label htmlFor="porol">Пароль: (Мин.4, Макс.8)</label>
    <input
      id="porol"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      minLength={4}
      maxLength={8}
      size={20}
      type="password"
      required
    /><br />

    <button type="submit">Зарегистрироваться</button>
  </form>


    <img src="/инжинер.gif" alt="инжинер" /><br />
</dialog>

      </main>
    </div>
  );
}
