const SCENARIOS = [

/* =====================================================
   STAGE 1
   VLAN設定ミス
===================================================== */

{
    id: 1,

    title: "VLAN設定ミス",

    mission:
        "PC1からServer1へPingを成功させよ",

    topology: {
        pcIp: "192.168.10.10/24",
        serverIp: "192.168.20.10/24"
    },

    state: {

        vlan20Configured: false

    },

    showCommands: {

        "show vlan":
`VLAN Name
10 USERS
20 SERVERS`,

        "show interface":
`Gi0/1 access vlan 10
Gi0/2 access vlan 999`,

        "show ip route":
`C 192.168.10.0/24
C 192.168.20.0/24`
    },

    configCommands: {

        "switchport access vlan 20":
            (state) =>
            {
                state.vlan20Configured = true;
            }
    },

    clearCondition:
        (state) =>
        {
            return state.vlan20Configured;
        }
},

/* =====================================================
   STAGE 2
   デフォルトGW未設定
===================================================== */

{
    id: 2,

    title: "デフォルトGW未設定",

    mission:
        "PC1にデフォルトGWを設定してPingを成功させよ",

    topology: {
        pcIp: "192.168.10.10/24",
        serverIp: "192.168.20.10/24"
    },

    state: {

        gatewayConfigured: false

    },

    showCommands: {

        "show ip":
`PC1

IP Address
192.168.10.10

Default Gateway
Not Configured`,

        "show ip route":
`C 192.168.10.0/24
C 192.168.20.0/24`
    },

    configCommands: {

        "ip default-gateway 192.168.10.1":
            (state) =>
            {
                state.gatewayConfigured = true;
            }
    },

    clearCondition:
        (state) =>
        {
            return state.gatewayConfigured;
        }
},

/* =====================================================
   STAGE 3
   ACL拒否
===================================================== */

{
    id: 3,

    title: "ACL拒否",

    mission:
        "ACLを修正してPingを成功させよ",

    topology: {
        pcIp: "10.1.1.10/24",
        serverIp: "10.2.2.10/24"
    },

    state: {

        aclFixed: false

    },

    showCommands: {

        "show access-list":
`Extended IP access list 100

10 deny icmp any any
20 permit ip any any`,

        "show ip route":
`C 10.1.1.0/24
C 10.2.2.0/24`
    },

    configCommands: {

        "no deny icmp any any":
            (state) =>
            {
                state.aclFixed = true;
            }
    },

    clearCondition:
        (state) =>
        {
            return state.aclFixed;
        }
},

/* =====================================================
   STAGE 4
   スタティックルート漏れ
===================================================== */

{
    id: 4,

    title: "スタティックルート漏れ",

    mission:
        "スタティックルートを設定してPingを成功させよ",

    topology: {
        pcIp: "172.16.1.10/24",
        serverIp: "172.16.3.10/24"
    },

    state: {

        routeConfigured: false

    },

    showCommands: {

        "show ip route":
`Codes: C - connected

C 172.16.1.0/24
C 172.16.2.0/24`
    },

    configCommands: {

        "ip route 172.16.3.0 255.255.255.0 10.0.0.2":
            (state) =>
            {
                state.routeConfigured = true;
            }
    },

    clearCondition:
        (state) =>
        {
            return state.routeConfigured;
        }
}

];
