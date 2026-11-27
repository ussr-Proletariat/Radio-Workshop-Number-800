"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = mode === "register" ? "/api/register" : "/api/login";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nick, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(mode === "register" ? "Зарегистрирован!" : "Вход выполнен!");
      dialogRef.current?.close();
      router.push("/verstak")
    } else {
      alert(data.error);
    }
  }
  
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <main className="max-w-2xl mx-auto px-6 py-12 font-sans">
        <img src="/i.png" alt="i" /><br />
    <h2>Приветствую тебя товарищь радиолюбитель в радио мастерской номер 800</h2>
     <p>На данном сайте ты сможеш спроектировать схемму и ее распичатоть</p>
    <p>Сайт полностью анонимный. Для работы сним нужно будет зарегистрироваться но там попросят тебя товарищь толко придумать ник и пароль</p><br />

    <img src="/инжинер2.gif" alt="инжинер" /><br />
    
    <button className="bg-red-600 hover:bg-yellow-400 text-white font-medium px-6 py-2 rounded-lg transition-colors" onClick={() => dialogRef.current?.showModal()}>
      Зарегистрироваться
    </button>



<dialog ref={dialogRef} className="rounded-xl p-6 shadow-2xl backdrop:bg-black/50" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

  <button className="bg-red-900 hover:bg-green-900 text-white font-medium px-6 py-2 rounded-lg transition-colors" onClick={() => dialogRef.current?.close()}>
    Я передумал(а) регистрироваться</button>
    <h1>{mode == "register" ? "Регистрация" : "Вход"}</h1>

  <form onSubmit={handleSubmit}>
    <label htmlFor="nik">Ник: (Мин.4, Макс.20)</label>
    <input className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <input className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="porol"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      minLength={4}
      maxLength={8}
      size={20}
      type="password"
      required
    /><br />

    <img src="/инжинер.gif" alt="инжинер" /><br />

<button className="bg-red-600 hover:bg-yellow-400 text-white font-medium px-6 py-2 rounded-lg transition-colors" type="submit">
  {mode === "register" ? "Зарегистрироваться" : "Войти"}
</button>
<button type="button" onClick={() => setMode(mode === "register" ? "login" : "register")}>
  {mode === "register" ? " Войти" : " Зарегистрироваться"}
</button>

  </form>


</dialog>

      </main>
    </div>
  );
}
