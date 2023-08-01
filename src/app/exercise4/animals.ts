
enum SPECIES {
  Lion = 'Lion',
  Elephant = 'Elephant',
  Monkey = 'Monkey',
}

enum REACTION {
  DoNothing = 'do nothing',
  FormPride = 'form a pride',
  Flees = 'flees',
  ClimbsUpTree = 'climbs up a tree',
  BecomeFriends = 'become friends',
}

export class Animal {
  species: string = 'animal'
  icon: string = '🐉'

  getSpecies() {
    return this.species
  }

  getIcon() {
    return this.icon
  } 

  getReaction(animal: Animal): REACTION {
    return REACTION.DoNothing
  }
}

export class Lion extends Animal {
  species = SPECIES.Lion
  icon = '🦁'
  
  getReaction(animal: Animal): REACTION {
    const otherSpecies = animal.getSpecies()
    switch(otherSpecies) {
      case SPECIES.Lion:
        return REACTION.FormPride
      default:
        return REACTION.DoNothing
    }
  }
}

export class Elephant extends Animal {
  species = SPECIES.Elephant
  icon = '🐘'
  
  getReaction(animal: Animal): REACTION {
    const otherSpecies = animal.getSpecies()
    switch(otherSpecies) {
      case SPECIES.Lion:
        return REACTION.Flees
      default:
        return REACTION.BecomeFriends
    }
  }
}

export class Monkey extends Animal {
  species = SPECIES.Monkey
  icon = '🐒'
  
  getReaction(animal: Animal): REACTION {
    const otherSpecies = animal.getSpecies()
    switch(otherSpecies) {
      case SPECIES.Lion:
        return REACTION.ClimbsUpTree
      default:
        return REACTION.BecomeFriends
    }
  }
}

export class Zoo {
  meet(firstAnimal: Animal, secondAnimal: Animal) {
    let resp = ''

    const reactionFirstAnimal = firstAnimal.getReaction(secondAnimal)
    const reactionSecondAnimal = secondAnimal.getReaction(firstAnimal)

    if (reactionFirstAnimal === reactionSecondAnimal) {
      resp = `They ${reactionFirstAnimal}.`
    } else {
      if(reactionFirstAnimal !== REACTION.DoNothing) {
        const animalSpices = firstAnimal.getSpecies()
        resp += `${animalSpices} ${reactionFirstAnimal}.`
      }
      if(reactionSecondAnimal !== REACTION.DoNothing) {
        const animalSpices = secondAnimal.getSpecies()
        resp += ` ${animalSpices} ${reactionSecondAnimal}.`
      }
    }
    return resp
  }
}
