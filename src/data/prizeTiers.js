import flipperPlaceholder from '../assets/prizes/flipper_zero_img.webp'
import goproPlaceholder from '../assets/prizes/gopro-placeholder.svg'
import monitorPlaceholder from '../assets/prizes/minotor_pic.avif'
import casioWatch from "../assets/prizes/casio_image.jpg"
import laptopImage from "../assets/prizes/thinkpad_laptop_img.jpg"
import porkbun from "../assets/prizes/porkbun.png"
import keychain from "../assets/prizes/keychain_image.jpg"
import macropad from "../assets/prizes/macropad_image.jpg"
import gopro from "../assets/prizes/gopro.jpg"
import grant from "../assets/prizes/grant_image.jpg"
import ai from "../assets/prizes/claude_vs_gemini.png"
import hardwareGrantPlaceholder from "../assets/prizes/hardware-grant-placeholder.svg"
import protonMe from "../assets/prizes/protonMe.jpg"
import hackTheBox from "../assets/prizes/hackthebox.png"
import tryHackMe from "../assets/prizes/tryHackMe.png"
import keyboard from "../assets/prizes/creamy_keyboard.jpg"
import headphones from "../assets/prizes/headphones.png"
import glasses from "../assets/prizes/metaGlasses.jpeg"
import charger from "../assets/prizes/anker_image.png"

import rfidSleeves from "../assets/prizes/rfid_sleeves.png"
import faradayBag from "../assets/prizes/faraday_bag.png"
import badusb from "../assets/prizes/badusb.png"
import rfidWallet from "../assets/prizes/rfid_wallet.png"
import miracast from "../assets/prizes/miracast.png"
import airtag from "../assets/prizes/airtag.png"
import cmfBuds from "../assets/prizes/cmf_buds.png"
import camera from "../assets/prizes/camera.png"
import wifi from "../assets/prizes/wifi.png"
import microphone from "../assets/prizes/microphone.png"
import backpack from "../assets/prizes/backpack.png"
import mxMaster from "../assets/prizes/mx_master.png"
import zimaBlade from "../assets/prizes/zimablade.png"
import rubberDucky from "../assets/prizes/rubber_ducky.png"
import standingDesk from "../assets/prizes/standing_desk.png"

export const prizeTiers = [
  {
    hours: 1,
    codename: 'LVL 1 CLEARANCE',
    items: [
      { id: 'keychain', name: 'One Key Keychain', image: keychain, desc: 'A tiny macropad keychain for shortcut energy.' },
      { id: 'rfid-sleeves', name: 'RFID/NFC Blocking Sleeves (Pack)', image: rfidSleeves, desc: 'Protective RFID/NFC shielding sleeves for credit cards & passports.' },
      { id: 'hardware-grant', name: '$6.5/hr Hardware Grant', image: grant, desc: '$6.50 for every hour you log, straight to hardware.' },
      { id: 'general-grant', name: '$5.75/hr Upgrade Grant', image: grant, desc: "grant to upgrade your prize given you've already earned another one; read rules at ispy.hackclub.com/general_rules" },
    ],
  },
  {
    hours: 3,
    codename: 'LVL 2 CLEARANCE',
    items: [
      { id: "ai-grant", name: "$20 AI Grant", image: ai, desc: "$20 AI Grant" },
      { id: 'domain-grant', name: '$20 Domain Grant', image: porkbun, desc: 'domains are cool' },
      { id: 'storage-grant-20', name: '$20 Storage Grant', image: grant, desc: '$20 grant for high-speed MicroSD, flash drive, or cloud storage.' },
      { id: 'macropad', name: 'Four Key Macropad', image: macropad, desc: 'A satisfying four-button macro pad.' },
      { id: 'faraday-bag', name: 'Faraday Signal-Blocking Bag', image: faradayBag, desc: 'Signal-blocking Faraday pouch to shield phones and keyfobs from RF, GPS, RFID, and Wi-Fi tracking.' },
      { id: 'badusb', name: 'Programmable BadUSB Dev Board', image: badusb, desc: 'RP2040/MalDuino keystroke injection dev board for physical HID payloads.' },
      { id: 'rfid-wallet', name: 'Tactical RFID-Blocking Spy Wallet', image: rfidWallet, desc: 'Minimalist tactical wallet with built-in RFID/NFC signal shielding.' },
      { id: 'miracast', name: 'Miracast Wireless Display Adapter', image: miracast, desc: 'Wireless HDMI receiver dongle for screen mirroring and wireless casting.' },
    ],
  },
  {
    hours: 6,
    codename: 'LVL 3 CLEARANCE',
    items: [
      { id: 'airtag', name: 'Apple AirTag / SmartTag', image: airtag, desc: 'Apple AirTag or Samsung SmartTag tracker to keep tabs on your gear.' },
      { id: 'cmf-buds', name: 'CMF Buds by Nothing', image: cmfBuds, desc: 'CMF Buds / Neckband Pro with Active Noise Cancellation for wiretaps and tunes.' },
      { id: 'backpack-stationery', name: 'Spy Tech Backpack / Stationery Grant', image: backpack, desc: 'Tech backpack or $40 grant for spy stationery & covert gear.' },
      { id: 'cctv-camera', name: 'Smart Surveillance CCTV Camera', image: camera, desc: 'Now I see you, now I dont — smart Pan/Tilt 2K Wi-Fi security camera.' },
      { id: 'wifi', name: 'Wifi Router', image: wifi, desc: 'A cool wifi router for all your hacking needs 😎' },
      { id: 'microphone', name: 'Microphone', image: microphone, desc: 'Wait you can hear me? (Any microphone upto 40$)' },
    ],
  },
  {
    hours: 15,
    codename: 'LVL 4 CLEARANCE',
    items: [
      { id: 'mx-master-3s', name: 'Logitech MX Master 3S Mouse', image: mxMaster, desc: 'The ultimate ergonomic wireless precision mouse with MagSpeed electromagnetic scrolling.' },
      { id: 'watch', name: 'Casio Watch', image: casioWatch, desc: 'sick watch to flex on people with (can switch for any watch that is 100 or less)' },
      { id: 'ProtonMe', name: "ProtonMe 1 year subscription", image: protonMe, desc: "Proton Me Subscription for one year to protect yourself." },
      { id: "tryHackMe", name: "TryHackMe 6 month subscription", image: tryHackMe, desc: "six months of pure cybersecurity grind" },
      { id: "keyboard", name: "EPOMAKER TH99 PRO Keyboard", image: keyboard, desc: "really good keyboard (i use it daily)." },
      { id: "charger", name: "Anker Nano Charger (100W) with USB-C Cable", image: charger, desc: "100W charging for charging stuff" },
    ],
  },
  {
    hours: 25,
    codename: 'LVL 5 CLEARANCE',
    items: [
      { id: 'standing-desk', name: 'Motorized Electric Standing Desk', image: standingDesk, desc: 'Motorized height-adjustable electric standing desk (48"x24" / 55"x24") for ergonomic hacking.' },
      { id: 'monitor', name: '144Hz Curved Monitor', image: monitorPlaceholder, desc: '144 hertz 27 inch curved monitor for whatever you do on your computer.' },
      { id: 'flipper-zero', name: 'Flipper Zero', image: flipperPlaceholder, desc: 'can do cool stuff.' },
    ],
  },
  {
    hours: 50,
    codename: 'LVL 6 CLEARANCE',
    items: [
      { id: 'gopro', name: 'GoPro HERO12 Black', image: gopro, desc: 'Nice mini-camera to document all your adventures. ' },
      { id: 'zimablade', name: 'ZimaBlade 7700 SBC Server', image: zimaBlade, desc: 'Quad-Core x86 single board microserver with PCIe slot and dual SATA for your home lab.' },
      { id: 'laptop', name: 'Thinkpad T14 (Gen 2)', image: laptopImage, desc: 'Laptop with decent specs. Core i5-1145G7, 16GB RAM, 256GB SSD' },
      { id: "hackTheBox", name: "Hack The Box VIP+ 1 Year Subscription", image: hackTheBox, desc: "rlly cool cybersec tool + env. check it out 100%" },
      { id: "headphones", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)", image: headphones, desc: "really good headphones (i use these daily as well)" },
      { id: "metaGlasses", name: "Meta Glasses Gen 1", image: glasses, desc: "could be used to spy on ppl...." },
    ],
  },
]

export const highlightedPrizes = [
  {
    id: prizeTiers[0].items[0].id,
    name: prizeTiers[0].items[0].name,
    image: prizeTiers[0].items[0].image,
    codename: prizeTiers[0].codename,
  },
  {
    id: prizeTiers[2].items[0].id,
    name: prizeTiers[2].items[0].name,
    image: prizeTiers[2].items[0].image,
    codename: prizeTiers[2].codename,
  },
  {
    id: prizeTiers[5].items[0].id,
    name: prizeTiers[5].items[0].name,
    image: prizeTiers[5].items[0].image,
    codename: prizeTiers[5].codename,
  },
]

export function findPrize(prizeId) {
  for (const tier of prizeTiers) {
    const item = tier.items.find((i) => i.id === prizeId)
    if (item) return { item, tier, cost: tier.hours }
  }
  return null
}
