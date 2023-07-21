<script setup lang="ts">
import { Role, roleName } from '@/models/role'
import { store } from '@/service/store'
import { computed } from 'vue'

const description = computed(() => {
  switch (store.showRoleInfo) {
    case Role.WEREWOLF:
      return `
            By day, you appear as an ordinary villager, indistinguishable from the others.
            By night, however, you reveal your true form to your werewolf brethren, choosing
            a villager to eliminate from the game.
            Your objective is to outnumber the villagers without revealing your identity.
            You must work together with your fellow werewolves, carefully navigating the
            suspicions of the villagers and steering blame away from yourselves. You win the
            game when the number of werewolves equals or surpasses the number of villagers.
            <br>
            <br>
            During the night all living werewolves pick one target to kill & eat.
            If the target is the diseased, you won't be able to kill tomorrow.`
    case Role.VILLAGER:
      return `
            As a Villager, your goal is survival and uncovering the hidden Werewolves
            amongst you. You have no special abilities except your power of deduction
            and your vote during the day to decide whom amongst you seems most likely
            to be a Werewolf. Work together, discern wisely, and protect your village
            to win the game.
            <br>
            <br>
            During the day, everyone in the village votes one person out to be killed.`
    case Role.SEER:
      return `
            As the Seer, your gift is insight. Each night, you may peek behind the mask
            of one fellow villager to discern their true nature: Werewolf or not. Use
            this information wisely to guide the village, but beware of revealing
            yourself, for the werewolves lurk in shadows, waiting to strike. Navigate
            with caution and intuition to help the villagers prevail.
            <br>
            <br>
            Each night the seer gets to pick one person. They find out if the person
            is a werewolf (👎) or part of the villagers (👍).`
    case Role.WITCH:
      return `
            As the Witch, you possess a dual-edged power. In your hands, you hold two
            potions, each to be used once in the game. The healing potion has the power
            to revive a villager killed in the night. The poison potion is a deadly
            weapon, capable of eliminating anyone you suspect or fear. Choose when and
            whom to use your potions on wisely, for your choices can sway the fate of
            the village.
            <br>
            <br>
            You can heal once per game, you can kill once per game. You are allowed to
            heal yourself.`
    case Role.THIEF:
      return `
            As the Thief, opportunity and choice are your allies. At the beginning of
            the game, you are granted a unique privilege. You may choose to keep your
            current villager status or swap it with one of the two remaining roles
            undisclosed to the village. This decision occurs only once, setting your
            path for the rest of the game. Use this advantage to influence the fate
            of the village, be it as a simple villager or adopting a new mantle of
            power.
            <br>
            <br>
            In case both remaining roles are Werewolf, you won't be offered to stay
            a villager.`
    case Role.HUNTER:
      return `
            As the Hunter, your strength comes from your resolve. Should the
            unfortunate event arise where you meet your end, either by the werewolves' 
            fangs or the villagers' misguided vote, you may exact one final act of
            retribution. You can choose to take another player down with you. Use
            this power judiciously, for it could drastically alter the course of
            the game.
            <br>
            <br>
            If you die during the night, your choice remains anonymous. If you die 
            during voting you have to make yourself public and choose to kill.`
    case Role.CUPID:
      return `
            As Cupid, your role is to ignite the flame of love. At the game's dawn,
            you will choose two players to be lovers - they could be villagers,
            werewolves, or even yourself. Once bonded, the lovers share a destiny
            - if one perishes, the other follows, their heart unable to bear the
            loss. For the lovers to win, they must both survive until the game's
            end, regardless of their other allegiances. Love in this game is as
            powerful as it is perilous.
            <br>
            <br>
            The lovers will see each other after you pick them. You walk around
            the room and tap on their shoulder.`
    case Role.LITTLE_GIRL:
      return `
            As the Little Girl, your role is one of daring curiosity. In the dead
            of night, when the werewolves awaken, you may try to sneak a peek to
            discern their true identities. But be wary, for if the werewolves
            catch you spying, you will become their next victim. Stealth and
            subtlety are your best friends on this risky venture.
            <br>
            <br>
            You can be as obvious as you want while peeking, but you don't get
            to fake being an actual werewolf. You don't get to vote with them.`
    case Role.DISEASED:
      return `
            As the Diseased, you carry a strange affliction. Should the werewolves
            choose to attack you in the night, they will find themselves unable
            to kill the next night, their power momentarily weakened by your
            peculiar malady. You have no control over this ability, it is a silent
            deterrent that can afford the village a brief, but crucial, respite.
            <br>
            <br>
            The werewolves won't know that they ate you. The next night their kill
            will simply be ineffective and nothing happens.`
    case Role.JESTER:
      return `
            As the Jester, your role is a dance of deceit and provocation.
            Your sole aim is to be voted out by the villagers during the day.
            Play the fool or the villain, draw suspicion or ire, and if you
            succeed in being ousted by a vote, you alone win the game.
            It's a risky gambit, a game within a game, demanding finesse and
            daring.
            <br>
            <br>
            You only win if killed during the day. If the werewolves eat you,
            you lose.`
  }
  return ''
})

function close() {
  store.showRoleInfo = null
}
</script>

<template>
  <div class="modal-bg" v-if="store.showRoleInfo" @click="close">
    <div class="modal" @click.stop="() => {}">
      <div class="header">{{ roleName(Role[store.showRoleInfo]) }}</div>
      <div class="content" v-html="description" />
      <a class="x" @click="close" href="javascript:void(0)">x</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #00000020;
  body.night & {
    background: #ffffff30;
  }
  min-height: 100svh;
  padding: 1em;
}

.modal {
  position: relative;
  background: #ffffff;
  body.night & {
    background: #000000;
  }
  min-height: 50svh;
  max-width: 600px;
  margin: auto;
  & > div {
    padding: 1em;
  }
  .header {
    padding-bottom: 0;
    font-size: 1.5em;
  }
}

.x {
  color: unset;
  display: inline-block;
  position: absolute;
  top: 0.3em;
  right: 0.7em;
  font-size: 1.5em;
}
</style>
