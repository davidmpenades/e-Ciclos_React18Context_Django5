from rest_framework import serializers
from .models import Users
from .models import Profile
# from emove.app.rent.models import Rent
# from emove.app.bikes.models import Bikes

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ( 'id', 'uuid', 'username', 'email', 'password', 'type')

    def register(context):
        username = context['username']
        email = context['email']
        password = context['password']

        username_exist = len(Users.objects.filter(username=username))
        email_exist = len(Users.objects.filter(email=email))

        if (email_exist > 0 or username_exist > 0):
            raise serializers.ValidationError('*Username or email already exists.')

        user = Users.objects.create_user(email=email, username=username, password=password)

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
        }

    def login(context):
        username = context['username']
        password = context['password']

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('*User not found.')

        if not user.check_password(password):
            raise serializers.ValidationError('*Wrong username or password.')

        return {
            'user': {
                'id': user.id,
                'uuid': user.uuid,
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
        }

    def getUser(context):
        username = context['username']
        print(username)

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('*User not found.')

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
        }

    def refreshToken(context):
        username = context['username']

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('Username not valid.')

        return {
            'token': user.token
        }

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'user', 'name', 'lastsnames', 'image']

    def to_Profile(instance):
        return {
            "id": instance.id,
            "user": instance.user,
            "name": instance.name,
            "lastsnames": instance.lastsnames,
            "image": instance.image,
        }

    def create(context):
        user_id = context['id']
        user = Users.objects.get(pk=user_id)

        if user is None:
            raise serializers.ValidationError('User not found')
       
        profile = Profile.objects.create(
            user_id=user_id, 
            name="", 
            lastsnames="",
            image="https://avatars.dicebear.com/api/adventurer/" + context['username'] + ".svg")

        profile.save()
        return profile

    def update(current_user, user_context, profile_context):
        user_id = profile_context['id']
        user = Users.objects.get(pk=user_id)

        newName = profile_context['name']
        newLastsnames = profile_context['lastsnames']
        newImage = profile_context['image']

        newUsername = user_context['username']
        newEmail = user_context['email']

        if user is None:
            raise serializers.ValidationError('User not found')

        if user != current_user:
            raise serializers.ValidationError('Invalid access')

        if newUsername != user.username: 
            username_exist = len(Users.objects.filter(username=newUsername))
            print(username_exist)
            if (username_exist > 0):
                raise serializers.ValidationError('*Username already exists.')
            Users.objects.filter(username=current_user).update(username = newUsername)

        if newEmail != user.email: 
            email_exist = len(Users.objects.filter(email=newEmail))
            print(email_exist)
            if (email_exist > 0):
                raise serializers.ValidationError('*Email already exists.')
            Users.objects.filter(username=current_user).update(email = newEmail)

        newUser = Users.objects.get(username=newUsername)
        
        Profile.objects.filter(user_id=user_id).update(
            name = newName,
            lastsnames = newLastsnames,
            image = newImage,
        )

        profile = Profile.objects.get(user_id=user_id)

        return {
            'user': {
                'id': newUser.id,
                'username': newUser.username,
                'email': newUser.email,
                'type': newUser.type
            },
            'profile': {
                'id': profile.id,
                'name': profile.name,
                'lastsnames': profile.lastsnames,
                'image': profile.image,
            },
            'token': newUser.token,
            'ref_token': newUser.ref_token,
        }

    # def getStats(current_user, id):
    #     user = User.objects.get(pk=id)

    #     if user is None:
    #         raise serializers.ValidationError('User not found')

    #     if user != current_user:
    #         raise serializers.ValidationError('Invalid access')
            
    #     total_stats = len(Rent.objects.filter(user_id=id))
    #     return total_stats
