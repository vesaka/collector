<template>
    <Transition name="fade">
        <div>
            <h2>Recycle time</h2>
            <button type="button" class="btn btn-primary" @click="$emit('action', 'game_start')">Play</button>
        </div>
    </Transition>
</template>
