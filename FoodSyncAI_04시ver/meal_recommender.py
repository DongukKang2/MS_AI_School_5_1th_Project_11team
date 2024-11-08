import numpy as np
from sklearn.neighbors import NearestNeighbors

class MealRecommender:
    def __init__(self, nutrition_data, cluster_labels):
        self.nutrition_data = nutrition_data
        self.cluster_labels = cluster_labels
        
        # 영양소 비율 특성 선택
        self.features = ['protein_ratio', 'fat_ratio', 'carb_ratio', 
                        'sugar_ratio', 'sodium_scaled']
        
        # KNN 모델 초기화 및 학습
        self.knn = NearestNeighbors(n_neighbors=5, metric='euclidean')
        self.knn.fit(self.nutrition_data[self.features])

    def get_food_profile(self, food_name):
        """음식의 영양소 프로필 반환"""
        food_data = self.nutrition_data[self.nutrition_data['food_name'] == food_name]
        if food_data.empty:
            return None
            
        idx = food_data.index[0]
        cluster = self.cluster_labels[idx]
        return {
            'nutrients': food_data[self.features].iloc[0],
            'cluster': cluster,
            'cluster_type': self._get_cluster_type(cluster)
        }

    def _get_cluster_type(self, cluster):
        """클러스터 타입 반환"""
        cluster_data = self.nutrition_data[self.cluster_labels == cluster]
        mean_values = cluster_data[self.features].mean()
        
        if mean_values['protein_ratio'] > 0.4:
            return "고단백"
        elif mean_values['fat_ratio'] > 0.4:
            return "고지방"
        elif mean_values['carb_ratio'] > 0.6:
            return "고탄수화물"
        else:
            return "균형잡힌"

    def recommend_meals(self, input_food):
        """하루 식단 추천"""
        food_profile = self.get_food_profile(input_food)
        if not food_profile:
            return f"'{input_food}'을(를) 찾을 수 없습니다."

        current_cluster = food_profile['cluster']
        cluster_type = food_profile['cluster_type']
        
        recommendations = {
            'input_food': {
                'name': input_food,
                'profile': food_profile
            },
            'recommendations': []
        }

        # 사용된 음식 추적
        used_foods = {input_food}
        recommended_foods = set()

        # 끼니별 선호 클러스터 정의
        meal_preferences = {
            '아침': {
                'preferred_types': ["고단백", "균형잡힌"],
                'avoid_types': ["고지방", "고당류"]
            },
            '점심': {
                'preferred_types': ["균형잡힌", "고단백"],
                'avoid_types': ["고탄수화물"]
            },
            '저녁': {
                'preferred_types': ["균형잡힌", "고단백"],
                'avoid_types': ["고지방", "고당류"]
            }
        }

        # 각 끼니별 추천
        for meal in ['아침', '점심', '저녁']:
            meal_recommended = False
            preferences = meal_preferences[meal]
            
            # 선호하는 클러스터에서 먼저 시도
            preferred_clusters = [c for c, p in enumerate(self.cluster_labels) 
                                if self._get_cluster_type(c) in preferences['preferred_types']]
            
            for cluster in preferred_clusters:
                if meal_recommended:
                    break
                    
                cluster_foods = self.nutrition_data[self.cluster_labels == cluster]
                available_foods = cluster_foods[
                    ~cluster_foods['food_name'].isin(used_foods) & 
                    ~cluster_foods['food_name'].isin(recommended_foods)
                ]
                
                if not available_foods.empty:
                    recommended_food = available_foods.sample(1).iloc[0]
                    recommended_foods.add(recommended_food['food_name'])
                    used_foods.add(recommended_food['food_name'])
                    
                    recommendations['recommendations'].append({
                        'meal': meal,
                        'name': recommended_food['food_name'],
                        'nutrients': recommended_food[self.features],
                        'cluster_type': self._get_cluster_type(cluster)
                    })
                    meal_recommended = True

        return recommendations