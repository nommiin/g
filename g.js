g = {
    p: {
        p: 0,
        i: "globalvar localvarname = 512; if ( t == 2+2) {return a + b;}",
        f: function() {
            for(g.p.p = 0; g.p.p < g.p.i.length; g.p.p++) {
                for(t in g.t) {
                    if (g.p.i.substring(g.p.p, g.p.p + t.length) == t) {
                        g.p.p += t.length;
                        g.t[t]();
                        console.log("Found token in stream: '" + t + "' at position " + (g.p.p - t.length));
                    }
                }
            }
        },
        _se: function(c, a="") {
            // SEEK
            let s = 1, o = g.p.p;
            while (s > 0) {
                switch (g.p.i[++g.p.p]) {
                    case a: {s++; break;}
                    case c: {s--; break;}
                }
                
                if (g.p.p > g.p.i.length) {
                    console.error("End of stream error, could not find character '" + c + "'");
                    g.p.p = o;
                    return -1;
                }
            } g.p.p++;
            console.log("Found character in stream: '" + c + "' at position " + g.p.p);
            return g.p.p;
        },
        _sk: function(c) {
            // SKIP
            let o = g.p.p;
            while (g.p.i[g.p.p++] == c) {
                if (g.p.p > g.p.i.length) {
                    console.error("End of stream error, seems as if the rest are '" + c + "' characters!");
                    g.p.p = o;
                    return -1;
                }
            }
            console.log("Skipped '" + c + "' in stream until position " + g.p.p);
            return g.p.p;
        }

    },
    c: {
        "==": 0,
        "!=": 1,
        ">=": 2,
        "<=": 3,
        ">": 4,
        "<": 5
    },
    t: {
        "function": function() {
            // Name
            let h = g.p.p;
            let t = g.p._se("(");
            let n = g.p.i.substring(h, t - 1).trim();
            console.log("Found function in stream: '" + n + "' at position " + (g.p.p - n.length));

            // Arguments
            h = t;
            t = g.p._se(")");
            let p = g.p.i.substring(h, t - 1).trim();
            
            // Code
            h = g.p._se("{", "}");
            t = g.p._se("}", "{");
            let c = g.p.i.substring(h, t - 1);

            g.f.p[n] = new g.f.b(n, p, c);
        },
        "globalvar": function() {
            // Name 
            let h = g.p.p;
            let t = g.p._se("=");
            let n = g.p.i.substring(h, t - 1).trim();
            console.log("Found global variable in stream: '" + n + "' at position " + (g.p.p - n.length));

            // Value
            h = t;
            t = g.p._se(";");
            let v = g.p.i.substring(h, t - 1).trim();

            g.g.p[n] = new g.g.b(n, v);
            
        },
        "var": function() {
            // Name 
            let h = g.p.p;
            let t = g.p._se("=");
            let n = g.p.i.substring(h, t - 1).trim();
            console.log("Found variable in stream: '" + n + "' at position " + g.p.p - n.length);

            // Value
            h = t;
            t = g.p._se(";");
            let v = g.p.i.substring(h, t - 1).trim();

            g.v.p[n] = new g.v.b(n, v);
        },
        "if": function() {
            // Conditional
            let h = g.p._se("(");
            let t = g.p._se(")", "(");
            let e = g.p.i.substring(h, t- 1).trim();
            // Unfinished
            console.log("Expression: " + e);
        }
    },
    g: {
        b: function(n, v) {
            this.n = n;
            this.v = v;
        },
        p: {}
    },
    v: {
        b: function(n, v) {
            this.n = n;
            this.v = v;
        },
        p: {}
    },
    f: {
        b: function(n, p, c) {
            this.n = n;
            this.p = p;
            this.c = c;
        },
        p: {}
    }
}

g.p.f();
console.log("Global Variables: " + JSON.stringify(g.g.p));
console.log("Variables: " + JSON.stringify(g.v.p));
console.log("Functions: " + JSON.stringify(g.f.p));
