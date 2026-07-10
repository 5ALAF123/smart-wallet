

const SUPERBASE_URL = "https://eoecdmkeazzbvmlibpjy.supabase.co";
const SUPERBASE_ANON_KEY = "sb_publishable_g4FQMHnhnKi4a2c80TVULQ_s5L4SQ9H";

const supabaseClient = supabase.createClient(SUPERBASE_URL, SUPERBASE_ANON_KEY);

const balanceEl = document.getElementById("balance");
const amountInput = document.getElementById("amount-input");
const btnIncome = document.getElementById("btn-income");
const btnExpense = document.getElementById("btn-expense");
const historyList = document.getElementById("history-list");

async function loadData() {
  let { data: wallet, erro1 } = await supabaseClient
    .from("wallet")
    .select("balance")
    .single();

  if (wallet) {
    balanceEl.innerText = wallet.balance;
  }

  let { data: history, erro2 } = await supabaseClient
    .from("history")
    .select("*")
    .order("id", { ascending: false });

  if (history) {
    historyList.innerHTML = ""; 
    history.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = `${item.type}: ${item.amount} ج.م`;
      historyList.appendChild(li);
    });
  }
}



loadData();
