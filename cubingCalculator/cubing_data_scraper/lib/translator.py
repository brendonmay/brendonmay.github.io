# -*-coding:utf-8-*-

"""Convert text from Korean to English using a look-up table."""

# Due to using this simple method of string replacement, longer phrases are placed above shorter ones so they can be
# converted first. Otherwise, pieces of a longer phrase may get converted inadvertently and no longer match with its
# actual entry once it is evaluated

# NOTE: Currently, we are assuming that the tier of the item matches the tier of the cube so I have added all the
# possible phrases from those datasets. However, if we expand our dataset beyond this in the future, we may need to add
# more phrases to the table
TRANSLATION_TABLE = [
    ("보조무기(포스실드, 소울링 제외)", "secondary"),

    ("공격 시 10% 확률로 6레벨 중독효과 적용", "10% chance to apply level 6 poison when attacking"),
    ("공격 시 5% 확률로 2레벨 기절효과 적용", "5% chance to apply level 2 stun when attacking"),
    ("공격 시 10% 확률로 2레벨 슬로우효과 적용", "10% chance to apply level 2 slow when attacking"),
    ("공격 시 10% 확률로 3레벨 암흑효과 적용", "10% chance to apply level 3 dark when attacking"),
    ("공격 시 5% 확률로 2레벨 빙결효과 적용", "5% chance to apply level 2 freeze when attacking"),
    ("공격 시 5% 확률로 2레벨 봉인효과 적용", "5% chance to apply level 2 seal when attacking"),

    ("공격 시 3% 확률로 32의 HP 회복", "3% chance to recover 32 HP when attacking"),
    ("공격 시 3% 확률로 32의 MP 회복", "3% chance to recover 32 MP when attacking"),
    ("공격 시 3% 확률로 53의 HP 회복", "3% chance to recover 53 HP when attacking"),
    ("공격 시 3% 확률로 53의 MP 회복", "3% chance to recover 53 MP when attacking"),

    ("몬스터 처치 시 15% 확률로 95의 HP 회복", "15% chance to recover 95 HP when killing monsters"),
    ("몬스터 처치 시 15% 확률로 95의 MP 회복", "15% chance to recover 95 MP when killing monsters"),

    ("피격 시 20% 확률로 25의 데미지 무시", "20% chance to ignore 25 damage when hit"),
    ("피격 시 20% 확률로 38의 데미지 무시", "20% chance to ignore 38 damage when hit"),
    ("피격 시 30% 확률로 51의 데미지 무시", "30% chance to ignore 51 damage when hit"),

    ("피격 시 5% 확률로 데미지의 20% 무시", "5% chance to ignore 20% damage when hit"),
    ("피격 시 5% 확률로 데미지의 40% 무시", "5% chance to ignore 40% damage when hit"),
    ("피격 시 10% 확률로 데미지의 20% 무시", "10% chance to ignore 20% damage when hit"),
    ("피격 시 10% 확률로 데미지의 40% 무시", "10% chance to ignore 40% damage when hit"),

    ("캐릭터 기준 10레벨 당 공격력 : +1", "+1 ATT per 10 character levels"),
    ("캐릭터 기준 10레벨 당 마력 : +1", "+1 MATT per 10 character levels"),
    ("캐릭터 기준 10레벨 당 LUK : +1", "+1 LUK per 10 character levels"),
    ("캐릭터 기준 10레벨 당 STR : +1", "+1 STR per 10 character levels"),
    ("캐릭터 기준 10레벨 당 INT : +1", "+1 INT per 10 character levels"),
    ("캐릭터 기준 10레벨 당 DEX : +1", "+1 DEX per 10 character levels"),

    ("공격 시 1% 확률로 오토스틸", "1% chance to auto steal when attacking"),
    ("공격 시 2% 확률로 오토스틸", "2% chance to auto steal when attacking"),
    ("공격 시 3% 확률로 오토스틸", "3% chance to auto steal when attacking"),
    ("공격 시 5% 확률로 오토스틸", "5% chance to auto steal when attacking"),
    ("공격 시 7% 확률로 오토스틸", "7% chance to auto steal when attacking"),

    ("30% 확률로 받은 피해의 50%를 반사", "30% chance to reflect 50% of damage taken"),
    ("30% 확률로 받은 피해의 70%를 반사", "30% chance to reflect 70% of damage taken"),

    ("모든 스킬의 재사용 대기시간 : -1초(10초 이하는 5%감소 5초 미만으로 감소 불가)", "Skill cooldown -1 second"),
    ("모든 스킬의 재사용 대기시간 : -2초(10초 이하는 10%감소 5초 미만으로 감소 불가)", "Skill cooldown -2 seconds"),

    ("피격 후 무적시간 : +1초", "Invincibility time after being hit: +1 second"),
    ("피격 후 무적시간 : +2초", "Invincibility time after being hit: +2 seconds"),
    ("피격 후 무적시간 : +3초", "Invincibility time after being hit: +3 seconds"),
    ("피격 시 2% 확률로 7초간 무적", "2% of being invincible for 7 seconds when attacked"),
    ("피격 시 4% 확률로 7초간 무적", "4% of being invincible for 7 seconds when attacked"),

    ("HP 회복 아이템 및 회복 스킬 효율", "Increase efficiency of HP recovery items and skills by"),
    ("모든 스킬의 MP 소모", "MP consumption of all skills"),

    ("<쓸만한 하이퍼 바디> 스킬 사용 가능", "<Decent Hyper Body> enabled"),
    ("<쓸만한 윈드 부스터> 스킬 사용 가능", "<Decent Speed Booster> enabled"),
    ("<쓸만한 샤프 아이즈> 스킬 사용 가능", "<Decent Sharp Eyes> enabled"),
    ("<쓸만한 어드밴스드 블레스> 스킬 사용 가능", "<Decent Advanced Blessing> enabled"),
    ("<쓸만한 미스틱 도어> 스킬 사용 가능", "<Decent Mystic Door> enabled"),
    ("<쓸만한 컴뱃 오더스> 스킬 사용 가능", "<Decent Combat Orders> enabled"),
    ("<쓸만한 헤이스트> 스킬 사용 가능", "<Decent Haste> enabled"),

    ("4초 당 24의 HP 회복", "Recover 24 HP per 4 seconds"),
    ("4초 당 24의 MP 회복", "Recover 24 MP per 4 seconds"),
    ("캐릭터 기준 10레벨 당", "Per 10 character levels"),

    ("메소 획득량", "Meso Amount"),
    ("아이템 드롭률", "Item Drop Rate"),

    ("포스실드, 소울링", "soul shield"),

    ("몬스터 방어율 무시", "Ignore Enemy Defense"),
    ("보스 몬스터 공격 시 데미지", "Boss Damage"),
    ("크리티컬 확률", "Critical Chance"),
    ("크리티컬 데미지", "Critical Damage"),

    ("올스탯", "All Stats"),
    ("공격력", "ATT"),
    ("마력", "MATT"),
    ("데미지", "Damage"),
    ("방어력", "Defense"),
    ("이동속도", "Speed"),
    ("점프력", "Jump"),
    ("최대", "Max"),

    ("포스실드", "soul shield"),
    ("방패", "shield"),
    ("눈장식", "eye accessory"),
    ("귀고리", "earrings"),
    ("반지", "ring"),
    ("펜던트", "pendant"),
    ("얼굴장식", "face accessory"),

    ("무기", "weapon"),
    ("엠블렘", "emblem"),
    ("보조무기", "secondary"),
    ("모자", "hat"),
    ("상의", "top"),
    ("한벌옷", "overall"),
    ("하의", "bottom"),
    ("신발", "shoes"),
    ("장갑", "gloves"),
    ("망토", "cape"),
    ("벨트", "belt"),
    ("어깨장식", "shoulder"),
    ("기계심장", "heart"),

    ("레어 등급", "rare_item"),
    ("에픽 등급", "epic_item"),
    ("유니크 등급", "unique_item"),
    ("첫 번째 옵션", "first_line"),
    ("두 번째 옵션", "second_line"),
    ("세 번째 옵션", "third line"),
    ("노멀", "normal"),
    ("레어", "rare"),
    ("에픽", "epic"),
    ("유니크", "unique"),
    ("레전드리", "legendary"),
]


# TODO find more robust way to translate
# current method is simple but subject to substrings being translated inadvertently
def translate_text(input_text):
    translated_text = input_text
    for (kor, eng) in TRANSLATION_TABLE:
        translated_text = translated_text.replace(kor, eng)
    return translated_text
