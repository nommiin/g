g = {
    d: /* debug*/ true,
    v: /* variables */ {
        g: function(n) /* global( name ) */ {
            return g.d.g.p[n];
        },
        l: function(n) /* local( name ) */ {
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
            if (g.d) {console.log("Parse:[" + n + "]")};
            return eval(n);
        }
    },
    p: /* parser */ {
        p: /* pointer */ 0,
        i: /* input*/ `
            print(start of program)
            print(----------)
            globalvar first = 32;
            if (first == 32) {
                print(first is 32)
            } elseif (first == 24) {
                print(first is 24)
            } else {
                print(first is not 32 or 24)
            }
            print(----------)
            print(end of program)
        `,
        f: /* parse( input ) */ function( i ) {
            for(g.p.p = 0; g.p.p < g.p.i.length; g.p.p++) {
                for(t in g.t) {
                    if (g.p.i.substring(g.p.p, g.p.p + t.length) == t) {
                        if (g.d) {console.log("Token:[" + t + "]");} 
                        g.p.p += t.length;
                        g.t[t]();
                        break;
                    }
                }

                for (f in g.f) {
                    if (g.p.i.substring(g.p.p, g.p.p + f.length) == f) {
                        if (g.d) {console.log("Function:[" + f + "]");}
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
            if (g.d) {console.log("Seek:[" + c + "]");}
            return g.p.p;
        }
    },
    d: /* data */ {
        g: /* globalvar */ {
            c: function(n, v) /* create( name, value ) */ {
                if (g.d) {console.log("CreateGlobal:[" + n + ", " + v + "]");}
                this.n = n;
                this.v = isNaN(v) ? ((v[0] == "\"" && v[v.length - 1] == "\"") ? v.substring(1, v.length - 1) : g.v.p(v)) : g.v.p(v);
            },
            p: /* pool */ {}
        },
        l: /* localvar */ {
            c: function(n, v) /* create( name, value ) */ {
                if (g.d) {console.log("CreateLocal:[" + n + ", " + v + "]");}
                this.n = n;
                this.v = isNaN(v) ? ((v[0] == "\"" && v[v.length - 1] == "\"") ? v.substring(1, v.length - 1) : g.v.p(v)) : g.v.p(v);
            },
            p: /* pool */ {}
        },
        f: /* function */ {
            c: function(n, a, c) /* create(name, arguments, code ) */{
                if (g.d) {console.log("CreateFunction:[" + n + ", " + a + "]");}
                this.n = n;
                this.a = a;
                this.c = c;
            },
            p: /* pool */ {}
        }
    },
    c: /* condtional branch */ false,
    t: /* tokens */ {
        "globalvar": function() /* globalvar */ {
            let n = g.p.i.substring(g.p.p, g.p.s("=")).trim();
            g.d.g.p[n] = new g.d.g.c(n,
                g.p.i.substring(++g.p.p, g.p.s(";")).trim()
            );
        },
        "var": function() /* localvar */ {
            let n = g.p.i.substring(g.p.p, g.p.s("=")).trim();
            g.d.l.p[n] = new g.d.l.c(n,
                g.p.i.substring(++g.p.p, g.p.s(";")).trim()
            );
        },
        "if": function() /* conditional */ {
            var n = g.p.i.substring(g.p.s("(") + 1, g.p.s(")")).trim(); g.p.s("{");
            if (g.v.p(n) == false) {
                if (g.d) {console.log("IfCondFail:[" + n + "]");}
                g.p.s("}", "{");
                g.c = true;
            } else {
                if (g.d) {console.log("IfCondPass:[" + n + "]");}
            }
        },
        "elseif": function() /* elseif */ {
            var n = g.p.i.substring(g.p.s("(") + 1, g.p.s(")")).trim(); g.p.s("{");
            if (g.v.p(n) == false) {
                g.p.s("}", "{");
                g.c = true;
                if (g.d) {console.log("ElseifCondFail:[" + n + "]");}
            } else {
                g.c = false;
                if (g.d) {console.log("ElseifCondPass:[" + n + "]");}
            }
        },
        "else": function() /* else */ {
            g.p.s("{");
            if (g.c == true) {
                if (g.d) {console.log("ElseReach:[" + g.c + "]");}
                g.c = false;
            } else {
                if (g.d) {console.log("ElseReach:[" + g.c + "]");}
                g.p.s("}", "{");
            }
        }
    },
    f: /* inbuilt functions */ {
        "print": function(s) {
            console.log("ProgramOutput:[" + s + "]");
        }
    }
}

g.p.f();
console.log("LocalVar:[" + JSON.stringify(g.d.l.p) + "]");
console.log("GlobalVar:[" + JSON.stringify(g.d.g.p) + "]");
