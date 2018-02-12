g = {
    v: {
        g: function(n) {
            return g.d.g.p[n];
        },
        l: function(n) {
            return g.d.l.p[n];;
        },
        f: function(n) /* find( name ) */ {
            let gl = g.v.g(n),
                lo = g.v.l(n);
            return (gl != undefined ? gl : (lo != undefined) ? lo : n);
        }
    },
    p: {
        p: 0,
        i: `
            globalvar akakfksdv=128;
            var mylocalname=256;
            if (akakfksdv == 256) {
                
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
                this.v = v;
            },
            p: {}
        },
        l: /* localvar */ {
            c: function(n, v) {
                this.n = n;
                this.v = v;
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
        "<": (l,r) => {return l < r},
        ">": (l,r) => {return l > r},
        "!=": (l,r) => {return l != r},
        "<=": (l,r) => {return l <= r},
        ">=": (l,r) => {return l >= r},
        "==": (l,r) => {return l == r}
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
            var n = g.p.i.substring(g.p.s("(") + 1, g.p.s(")")).trim();
            for(let p = 0; p < n.length; p++) {
                for(c in g.c) {
                    if (n.substring(p, p + c.length) == c) {
                        console.log(c);
                        let l = n.substring(0, p).trim(),
                            r = n.substring(p + g.c[c].length, n.length).trim();
                        if (g.c[c](g.v.f(l).v, g.v.f(r).v) == true) {
                            // true
                        } else {
                            // false
                        }
                    }
                }
            }

        }
    },

}

// Run
g.p.f();
