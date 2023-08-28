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
    ("확률로 오토스틸", "chance to auto steal"),
    ("모든 스킬의 재사용 대기시간", "Skill cooldown"),

    ("HP 회복 아이템 및 회복 스킬 효율", "Increase efficiency of HP recovery items and skills by"),
    ("모든 스킬의 MP 소모", "MP consumption of all skills"),

    ("<쓸만한 하이퍼 바디> 스킬 사용 가능", "<Decent Hyper Body> enabled"),
    ("<쓸만한 윈드 부스터> 스킬 사용 가능", "<Decent Speed Booster> enabled"),
    ("<쓸만한 샤프 아이즈> 스킬 사용 가능", "<Decent Sharp Eyes> enabled"),
    ("<쓸만한 어드밴스드 블레스> 스킬 사용 가능", "<Decent Advanced Blessing> enabled"),
    ("<쓸만한 미스틱 도어> 스킬 사용 가능", "<Decent Mystic Door> enabled"),
    ("<쓸만한 컴뱃 오더스> 스킬 사용 가능", "<Decent Combat Orders> enabled"),
    ("<쓸만한 헤이스트> 스킬 사용 가능", "<Decent Haste> enabled"),

    ("포스실드, 소울링", "soul shield"),

    ("메소 획득량", "Meso Amount"),
    ("아이템 드롭률", "Item Drop Rate"),
    ("몬스터 방어율 무시", "Ignore Enemy Defense"),
    ("보스 몬스터 공격 시 데미지", "Boss Damage"),
    ("크리티컬 확률", "Critical Chance"),
    ("크리티컬 데미지", "Critical Damage"),

    # this is mostly for irrelevant lines on rare tier. only added here so that we have all line types mapped.
    ("캐릭터 기준 10레벨 당", "Per 10 character levels"),
    ("4초 당", "Per 4 seconds"),
    ("중독효과 적용", "poison status"),
    ("기절효과 적용", "stun status"),
    ("슬로우효과 적용", "slow status"),
    ("암흑효과 적용", "dark status"),
    ("빙결효과 적용", "freeze status"),
    ("봉인효과 적용", "seal status"),
    ("사랑에 빠진다", "to feel love"),
    ("격노를 느낀다", "to feel rage"),
    ("분노를 느낀다", "to feel angry"),
    ("감동을 느낀다", "to feel emotional"),
    ("행복을 느낀다", "to feel happy"),
    ("받은 피해의", "damage received"),
    ("를 반사", "reflect"),
    ("무적시간", "invincibility duration"),
    ("초간 무적", "seconds of invincibility"),
    ("공격 시", "When attacking"),
    ("피격 후", "After being hit"),
    ("몬스터 처치 시", "When killing a monster"),
    ("피격 시", "When hit"),
    ("확률로", "chance for"),
    ("회복", "recovery"),
    ("초간", "seconds"),
    ("레벨", "level"),
    ("무시", "ignore"),

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
    ("세 번째 옵션", "third_line"),
    ("노멀", "normal"),
    ("레어", "rare"),
    ("에픽", "epic"),
    ("유니크", "unique"),
    ("레전드리", "legendary"),

    ("초", "seconds"),
    ("의", "of"),
]


# TODO find more robust way to translate
# current method is simple but subject to substrings being translated inadvertently
def translate_text(input_text):
    translated_text = input_text
    for (kor, eng) in TRANSLATION_TABLE:
        translated_text = translated_text.replace(kor, eng)
    return translated_text
