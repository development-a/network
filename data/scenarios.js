const SCENARIOS = [

{
    id: 1,

    title: "VLAN設定ミス",

    level: 1,

    mission:
        "PC1からServer1へPingを成功させよ。",

    topology: {
        pcIp: "192.168.10.10/24",
        serverIp: "192.168.20.10/24"
    },

    rootCause:
        "SW1 Gi0/2 の VLAN設定ミス",

    keywords: [
        "vlan",
        "gi0/2",
        "設定ミス"
    ],

    commands: {

        help:
`使用可能コマンド

show vlan
show interface
show ip route
ping
help`,

        "show vlan":
`VLAN Name
10   USERS
20   SERVERS`,

        "show interface":
`Gi0/1 access vlan 10
Gi0/2 access vlan 999`,

        "show ip route":
`C 192.168.10.0/24
C 192.168.20.0/24`,

        "ping 192.168.20.10":
`Request timed out`
    }
},

{
    id: 2,

    title: "デフォルトゲートウェイ漏れ",

    level: 2,

    mission:
        "ServerへPingを成功させよ",

    topology: {
        pcIp: "192.168.10.10/24",
        serverIp: "192.168.20.10/24"
    },

    rootCause:
        "PC1のデフォルトゲートウェイ未設定",

    keywords: [
        "gateway",
        "gw",
        "デフォルト"
    ],

    commands: {

        help:
`使用可能コマンド

show ip
show ip route
ping
help`,

        "show ip":
`PC1
IP 192.168.10.10
GW Not Configured`,

        "show ip route":
`C 192.168.10.0/24
C 192.168.20.0/24`,

        "ping 192.168.20.10":
`Destination Host Unreachable`
    }
},

{
    id: 3,

    title: "ACLによる通信拒否",

    level: 3,

    mission:
        "ACLを調査して通信を復旧せよ",

    topology: {
        pcIp: "10.1.1.10/24",
        serverIp: "10.2.2.10/24"
    },

    rootCause:
        "ACLがICMPを拒否",

    keywords: [
        "acl",
        "icmp",
        "deny"
    ],

    commands: {

        help:
`使用可能コマンド

show access-list
show ip route
ping
help`,

        "show access-list":
`ACL 100

deny icmp any any
permit ip any any`,

        "show ip route":
`C 10.1.1.0/24
C 10.2.2.0/24`,

        "ping 10.2.2.10":
`Request timed out`
    }
},

{
    id: 4,

    title: "スタティックルート漏れ",

    level: 4,

    mission:
        "ルーティングを確認して復旧せよ",

    topology: {
        pcIp: "172.16.1.10/24",
        serverIp: "172.16.3.10/24"
    },

    rootCause:
        "R1のスタティックルート設定漏れ",

    keywords: [
        "route",
        "static",
        "ルート"
    ],

    commands: {

        help:
`使用可能コマンド

show ip route
ping
help`,

        "show ip route":
`C 172.16.1.0/24
C 172.16.2.0/24`,

        "ping 172.16.3.10":
`Network unreachable`
    }
}

];
