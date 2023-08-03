import { Role } from '@/models/role'

export function descriptionFor(role: Role): string {
  switch (role) {
    case Role.WEREWOLF:
      return `
            By day, you appear as an ordinary villager, indistinguishable from the others.
            By night, however, you reveal your true form to your werewolf brethren, choosing
            a villager to eliminate from the game.
            Your objective is to outnumber the villagers without revealing your identity.
            You must work together with your fellow werewolves, carefully navigating the
            suspicions of the villagers and steering blame away from yourselves. You win the
            game when there's only werewolves left alive.
            <!-- when the number of werewolves equals
                or surpasses the number of villagers.-->
            <br>
            <br>
            During the night all living werewolves pick one target to kill & eat.
            If the target is the diseased, the next night's kill will be ineffective.`
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
}

export const instructorInfo = `
To start a new game, just pick the roles you want to include and start the game! All players can see their role plus a little help text once the game has started. Cupid, thief, and jester are recommended for experienced players. Especially the thief can be tricky because whenever a thief is in play you don't know which special roles are drawn for any given game.<br>
<br>
During the game, at least one person should enable the audio narration to hear which role wakes up.<br>
<br>
As narrator, you should make sure to teach everyone about closing their eyes whenever it's not their turn in the night cycle.<br>
<br>
You should also make sure that everyone knows how voting works. Werewolves can point at who they want to kill, but the action should only be confirmed on the phone once they all agree on their victim.<br>
<br>
With a group of new players that don't all know each other, it can be helpful to arrange everyone in order of the names in the room lobby. This list remains in order for the entire game. That way two people sitting next to each other are right next to each other on the list.<br>
<br>
Roles are only revealed on death if it happens during daytime. Night time deaths remain hidden.<br>
<br>
Daytime voting works as follows:<br>
Everyone can nominate someone to be killed. As soon as anyone else seconds the nomination, that person now has 60s (or 30, you can choose a quicker format) to defend themselves. During the defense, nobody gets to talk except for the defendant. They can call on others to speak, but nobody gets to say anything except if called upon.<br>
Once time's up (use the timer!) there's a public vote. On the count of three, everyone raises their hand if they want to kill the accused. If more than 50% of the living players vote yes, they get confirmed ("kill by vote") and this day is over.<br>
If they live, they get to nominate the next person. The next defense begins.<br>
This goes on until nobody new gets nominated or someone gets killed.<br>
<br>
If cupid is in play:<br>
The first night is special because cupid has to be able to walk around the table. Everyone should stand up for the first night so that nobody can hear who stood up and moved their chair. Cupid should sneak as silently as possible so that nobody knows who they are.<br>
<br>
FAQ:<br>
The witch only gets each of their two potion once per game.<br>
The seer only sees if someone is good or bad. Not if they have a special role. All non-werewolf roles are show as villager.<br>
The witch can heal themselves.<br>
Cupid can pick themselves.<br>
The hunter gets their own night cycle if they get killed.<br>
<br>
Happy werewolfing!
`
