g = {
    v: {
        g: function(n) {
            return g.d.g.p[n];
        },
        l: function(n) {
            return g.d.l.p[n];
        },
        f: function(n) /* find( name ) */ {
            let gl = g.v.g(n),
                lo = g.v.l(n);
            return (gl != undefined ? gl : (lo != undefined) ? lo : {v: g.v.p(n)});
        },
        p: function(n) /* parse( number ) */ {
            for(var f in g.d.g.p) {n = n.replace(f, g.v.g(f).v);}
            for(var f in g.d.l.p) {n = n.replace(f, g.v.l(f).v);}
            console.log("Parse: " + n);
            return eval(n);
        }
    },
    p: {
        p: 0,
        i: `
            globalvar first = 32;
            globalvar second = first / 2;
            if (first * 2 == 64 && second == 16) {
                globalvar third = 96;
                print(Check passed!)
            }
        `,
        f: /* parse( input ) */ function( i ) {
            for(g.p.p = 0; g.p.p < g.p.i.length; g.p.p++) {
                for(t in g.t) {
                    if (g.p.i.substring(g.p.p, g.p.p + t.length) == t) {
                        console.log("Token: '" + t + "'"); 
                        g.p.p += t.length;
                        g.t[t]();
                        break;
                    }
                }

                for (f in g.f) {
                    if (g.p.i.substring(g.p.p, g.p.p + f.length) == f) {
                        console.log("Function: '" + f + "'");
                        g.p.p += f.length - 1;
                        g.f[f].apply(this, g.p.i.substring(g.p.s("(") + 1, g.p.s(")")).split(","));
                        break;
                        
                    }
                }
            }
        },
        s: /* seek( char, [avoid] ) */ function( c, a="" ) {
            var s = 1;
            while (s > 0) {
                switch (g.p.i[++g.p.p]) {
                    case c: {s--; break;}
                    case a: {s++; break;}
                }
                if (g.p.p > g.p.i.length) break;
            }
            return g.p.p;
        }
    },
    d: /* data */ {
        g: /* globalvar */ {
            c: function(n, v) {
                this.n = n;
                this.v = isNaN(v) ? ((v[0] == "\"" && v[v.length - 1] == "\"") ? v.substring(1, v.length - 1) : g.v.p(v)) : g.v.p(v);
            },
            p: {}
        },
        l: /* localvar */ {
            c: function(n, v) {
                this.n = n;
                this.v = isNaN(v) ? ((v[0] == "\"" && v[v.length - 1] == "\"") ? v.substring(1, v.length - 1) : g.v.p(v)) : g.v.p(v);
            },
            p: {}
        },
        f: /* function */ {
            c: function(n, a, c) {
                this.n = n;
                this.a = a;
                this.c = c;
            },
            p: {}
        },
        c: /* conditional statement */ {
            c: function(l, e, r) {
                this.l = l;
                this.e = e;
                this.r = r;
            },
            p: []
        }
    },
    c: /* condtionals */ {
        "<=": (l,r) => {return l <= r},
        ">=": (l,r) => {return l >= r},
        "!=": (l,r) => {return l != r},
        "==": (l,r) => {return l == r},
        "<": (l,r) =>  {return l < r},
        ">": (l,r) =>  {return l > r}
    },
    t: /* tokens */ {
        "globalvar": function() {
            let n = g.p.i.substring(g.p.p, g.p.s("=")).trim();
            g.d.g.p[n] = new g.d.g.c(n,
                g.p.i.substring(++g.p.p, g.p.s(";")).trim()
            );
        },
        "var": function() {
            let n = g.p.i.substring(g.p.p, g.p.s("=")).trim();
            g.d.l.p[n] = new g.d.l.c(n,
                g.p.i.substring(++g.p.p, g.p.s(";")).trim()
            );
        },
        "if": function() {
            var n = g.p.i.substring(g.p.s("(") + 1, g.p.s(")")).trim(); g.p.s("{");
            if (g.v.p(n) == false) {
                console.log("Fail")
                g.p.s("}", "{");
            }
        }
    },
    f: /* inbuilt functions */ {
        "print": function(s) {
            console.log(s);
        }
    }
}

g.p.f();
console.log("Local: " + JSON.stringify(g.d.l.p));
console.log("Global: " + JSON.stringify(g.d.g.p));
