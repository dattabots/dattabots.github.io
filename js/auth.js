// Demo login gate. Only a SHA-256 hash of the password is stored. NOT real security.
window.WKAuth={U:'marc',H:'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',K:'wk_session',
async sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')},
async login(u,p){if((u||'').trim().toLowerCase()!==this.U)return false;if(await this.sha(p)!==this.H)return false;sessionStorage.setItem(this.K,JSON.stringify({user:'Marc',at:Date.now()}));return true},
isIn(){return!!sessionStorage.getItem(this.K)},logout(){sessionStorage.removeItem(this.K)}};
