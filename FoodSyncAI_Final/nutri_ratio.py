import pickle 

def format_recommendations(recommendations, food_name):
    if isinstance(recommendations, str):
        return recommendations
    
    # 입력 음식 프로필
    input_food = recommendations['input_food']
    output = f"\n🍽️ 입력된 음식: {input_food['name']}\n"
    output += f"식단 유형: {input_food['profile']['cluster_type']}\n"
    output += "\n[영양소 구성]\n"
    
    # 영양소 비율 출력
    nutrients = {
        'protein_ratio': '단백질',
        'fat_ratio': '지방',
        'carb_ratio': '탄수화물',
        'sugar_ratio': '당류',
        'sodium_scaled': '나트륨'
    }
    
    for key, name in nutrients.items():
        value = input_food['profile']['nutrients'][key]
        output += f"- {name}: {value*100:.1f}%\n"
    
    # 추천 식단 출력
    output += "\n📋 추천 식단:\n"
    for rec in recommendations['recommendations']:
        output += f"\n[{rec['meal']} 추천 메뉴]\n"
        output += f"음식명: {rec['name']}\n"
        output += f"식단 유형: {rec['cluster_type']}\n"
        output += "영양소 구성:\n"
        for key, name in nutrients.items():
            value = rec['nutrients'][key]
            output += f"- {name}: {value*100:.1f}%\n"
    
    return output

with open('meal_recommender_model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)